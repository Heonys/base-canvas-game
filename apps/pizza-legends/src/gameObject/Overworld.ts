import { Layer } from "@/constants";
import { Camera, GameObject, KeyTracker } from "@/core";
import { Player } from "@/gameObject";
import { MapObject } from "@/maps";
import { gridCells } from "@/utils";

export class Overworld extends GameObject {
  sceneMap!: MapObject;
  player: GameObject;
  keyTracker: KeyTracker;
  camera: Camera;

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
}
