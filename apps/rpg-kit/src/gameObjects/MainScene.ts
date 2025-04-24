import { GameObject, KeyTracker, resources, Sprite, Vector2 } from "@/core";
import { Hero } from "@/gameObjects";
import { gridCells } from "@/utils";

export class MainScene extends GameObject {
  keyTracker: KeyTracker;
  canvasWidth = 320;
  canvasHeight = 180;

  constructor() {
    super(new Vector2(0, 0));
    this.keyTracker = new KeyTracker();

    this.addChild(
      new Sprite({
        resource: resources.images.sky,
        frameSize: new Vector2(this.canvasWidth, this.canvasHeight),
      }),
    );
    this.addChild(
      new Sprite({
        resource: resources.images.ground,
        frameSize: new Vector2(this.canvasWidth, this.canvasHeight),
      }),
    );
    this.addChild(new Hero(gridCells(6), gridCells(5)));
  }
}
