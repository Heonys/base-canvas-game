import { Direction, Layer } from "@/constants";
import { Camera, eventEmitter, GameObject, KeyTracker, store } from "@/core";
import { Actor, Player } from "@/gameObject";
import { MapObject } from "@/maps";
import { gridCells } from "@/utils";

export class Overworld extends GameObject {
  sceneMap!: MapObject;
  player: GameObject;
  keyTracker: KeyTracker;
  camera: Camera;
  isPause = false;
  isCutscene = false;

  constructor() {
    super();
    this.keyTracker = new KeyTracker();
    this.camera = new Camera();
    this.player = new Player(gridCells(5), gridCells(6));

    this.addChild(this.player);
    this.addChild(this.camera);
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

  async startCutscene(behaviors: Behavior[]) {
    for (let i = 0; i < behaviors.length; i++) {
      const handler = new OverworldEvent(behaviors[i]);
      await handler.start();
    }
  }
}

type Behavior =
  | { id: string; type: "WALK"; dir: Direction; destination: [x: number, y: number] }
  | { id: string; type: "STAND"; dir: Direction; duration: number };

type Resolve = (value?: unknown) => void;

class OverworldEvent extends GameObject {
  constructor(public behavior: Behavior) {
    super();
  }

  private STAND(resolve: Resolve) {
    const target = store.find(this.behavior.id) as Actor;
    target.pushBehaviors([this.behavior]);

    const id = eventEmitter.on("COMPLATE_STAND", this, (gameobject) => {
      if (gameobject === target) {
        eventEmitter.off(id);
        resolve();
      }
    });
  }

  private WALK(resolve: Resolve) {
    const target = store.find(this.behavior.id) as Actor;
    target.pushBehaviors([this.behavior]);

    const id = eventEmitter.on("COMPLATE_WALK", this, (gameobject) => {
      if (gameobject === target) {
        eventEmitter.off(id);
        resolve();
      }
    });
  }

  start() {
    return new Promise((resolve) => {
      this[this.behavior.type](resolve);
    });
  }
}
