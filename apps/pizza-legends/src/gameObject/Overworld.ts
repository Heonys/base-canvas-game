import { CutsceneBehavior, Layer } from "@/constants";
import {
  Camera,
  CutsceneHandler,
  eventEmitter,
  GameObject,
  KeyTracker,
  SceneTransition,
  store,
} from "@/core";
import { TextBox } from "@/gameObject";
import { MapObject } from "@/maps";

export class Overworld extends GameObject {
  sceneMap!: MapObject;
  keyTracker: KeyTracker;
  camera: Camera;
  isPause = false;
  isCutscene = false;
  transition: SceneTransition;

  constructor() {
    super();
    store.register("overworld", this);

    this.keyTracker = new KeyTracker();
    this.camera = new Camera();
    this.transition = new SceneTransition();

    this.addChild(this.camera);
    this.addChild(this.transition);
  }

  ready() {
    eventEmitter.on("OPEN_TEXT_BOX", this, (payload) => {
      let contents: string | null;

      if (payload instanceof GameObject) {
        contents = payload.getContents();
      } else {
        contents = payload;
      }

      if (!contents) return;
      const textbox = new TextBox(contents);
      this.addChild(textbox);

      eventEmitter.emit("START_TEXT_BOX");
      this.isPause = true;
      const id = eventEmitter.on("END_TEXT_BOX", this, () => {
        eventEmitter.off(id);
        textbox.destroy();
        this.isPause = false;
      });
    });

    eventEmitter.on("CHANGE_SCENE", this, (mapObject) => {
      this.transition.fadeOut(() => {
        this.chageMap(mapObject);
        this.transition.fadeIn();
      });
    });
  }

  chageMap(map: MapObject) {
    if (this.sceneMap) this.sceneMap.destroy();
    this.sceneMap = map;
    this.addChild(this.sceneMap);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.sceneMap.background?.drawEntry(ctx, 0, 0);
  }

  drawObject(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.layer === Layer.Lower) child.drawEntry(ctx, 0, 0);
    });

    [...this.children]
      .sort((a, b) => a.position.y - b.position.y)
      .forEach((child) => {
        if (child.layer === Layer.Main) child.drawEntry(ctx, 0, 0);
      });
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.layer === Layer.Upper) child.drawEntry(ctx, 0, 0);
    });
  }

  async startCutscene(behaviors: CutsceneBehavior[]) {
    this.isCutscene = true;
    for (let i = 0; i < behaviors.length; i++) {
      const handler = new CutsceneHandler(behaviors[i]);
      await handler.start();
    }
    this.isCutscene = false;
  }
}
