import { GameObject, KeyTracker, Vector2d } from "@/core";
import { Hero } from "@/gameObject";
import { DemoMap } from "@/maps";

export class Overworld extends GameObject {
  sceneMap: GameObject;
  player: GameObject;
  keyTracker: KeyTracker;

  constructor() {
    super();
    this.keyTracker = new KeyTracker();

    this.sceneMap = new DemoMap();
    this.player = new Hero(new Vector2d(5 * this.tileSize, 6 * this.tileSize));

    this.addChild(this.sceneMap);
    this.addChild(this.player);
  }

  ready() {}

  chageMap(map: GameObject) {
    if (this.sceneMap) this.sceneMap.destroy();
    this.sceneMap = map;
    this.addChild(this.sceneMap);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.sceneMap.drawEntry(ctx, 0, 0);
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.layer === "Upper") child.drawEntry(ctx, 0, 0);
    });
  }

  drawObject(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.layer === "Main") child.drawEntry(ctx, 0, 0);
    });
  }
}
