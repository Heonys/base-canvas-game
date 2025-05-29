import { Layer } from "@/constants";
import { Camera, GameObject, KeyTracker } from "@/core";
import { Player } from "@/gameObject";
import { MapObject } from "@/maps";

export class Overworld extends GameObject {
  sceneMap!: MapObject;
  player: GameObject;
  keyTracker: KeyTracker;
  camera: Camera;

  constructor() {
    super();
    this.keyTracker = new KeyTracker();
    this.camera = new Camera();
    this.player = new Player(5 * this.tileSize, 6 * this.tileSize);

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
    this.drawLayer(ctx, Layer.Lower);
    this.drawLayer(ctx, Layer.Main);
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.drawLayer(ctx, Layer.Upper);
  }

  private drawLayer(ctx: CanvasRenderingContext2D, layer: Layer) {
    this.children.forEach((child) => {
      if (child.layer === layer) child.drawEntry(ctx, 0, 0);
    });
  }
}
