import { CutsceneBehavior } from "@/constants";
import { eventEmitter, GameObject, store } from "@/core";
import { Actor } from "@/gameObject";

type Resolve = (value?: unknown) => void;

export class CutsceneHandler extends GameObject {
  constructor(public behavior: CutsceneBehavior) {
    super();
  }

  private stand(resolve: Resolve) {
    const target = store.find(this.behavior.id) as Actor;
    target.behavior = this.behavior;

    const id = eventEmitter.on("COMPLATE_STAND", this, (gameobject) => {
      if (gameobject === target) {
        eventEmitter.off(id);
        resolve();
      }
    });
  }

  private walk(resolve: Resolve) {
    const target = store.find(this.behavior.id) as Actor;
    target.behavior = this.behavior;

    const id = eventEmitter.on("COMPLATE_WALK", this, (gameobject) => {
      if (gameobject === target) {
        eventEmitter.off(id);
        resolve();
      }
    });
  }

  private textbox(resolve: Resolve) {
    if (this.behavior.type !== "textbox") return;
    const message = this.behavior.message;
    eventEmitter.emit("OPEN_TEXT_BOX", message);

    const id = eventEmitter.on("END_TEXT_BOX", this, () => {
      eventEmitter.off(id);
      resolve();
    });
  }

  start() {
    return new Promise((resolve) => {
      this[this.behavior.type](resolve);
    });
  }
}
