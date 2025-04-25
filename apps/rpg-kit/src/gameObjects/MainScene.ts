import { GameObject, KeyTracker, resources, Sprite, Vector2 } from "@/core";
import { Hero, Inventory, Rod } from "@/gameObjects";
import { gridCells } from "@/utils";

export class MainScene extends GameObject {
  keyTracker: KeyTracker;
  canvasWidth = 320;
  canvasHeight = 180;
  sky: GameObject;
  inven: GameObject;

  constructor() {
    super();
    this.keyTracker = new KeyTracker();

    this.sky = new Sprite({
      resource: resources.images.sky,
      frameSize: new Vector2(this.canvasWidth, this.canvasHeight),
    });

    this.inven = new Inventory();

    this.addChild(
      new Sprite({
        resource: resources.images.ground,
        frameSize: new Vector2(this.canvasWidth, this.canvasHeight),
      }),
    );
    this.addChild(new Hero(gridCells(6), gridCells(5)));
    this.addChild(new Rod(gridCells(7), gridCells(6)));
    this.addChild(new Rod(gridCells(9), gridCells(6)));
  }

  drawFixed(ctx: CanvasRenderingContext2D) {
    this.sky.drawImage(ctx, 0, 0);
    this.inven.drawEntry(ctx, 0, 0);
  }
}
