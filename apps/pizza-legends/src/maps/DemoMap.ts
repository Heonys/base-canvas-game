import { resources, Vector2d } from "@/core";
import { Npc, Sprite } from "@/gameObject";
import { MapObject } from "@/maps";

export class DemoMap extends MapObject {
  constructor() {
    super();

    this.addChild(
      new Sprite({
        src: resources.images.map,
        frameSize: new Vector2d(this.canvasWidth, this.canvasHeight),
      }),
    );
    this.addChild(
      new Npc({
        src: resources.images.npc,
        position: new Vector2d(8 * this.tileSize, 8 * this.tileSize),
      }),
    );
  }
}
