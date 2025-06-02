import { resources, Vector2d } from "@/core";
import { Actor, Sprite } from "@/gameObject";
import { MapObject } from "@/maps";
import { gridCells } from "@/utils";

export class DemoMap extends MapObject {
  constructor() {
    super();

    this.collisions = new Set(["7,6", "8,6", "7,7", "8,7"]);
    this.addChild(
      new Sprite({
        src: resources.images.map,
        frameSize: new Vector2d(this.canvasWidth, this.canvasHeight),
      }),
    );
    this.addChild(
      new Actor({
        id: "npc1",
        src: resources.images.npc,
        position: new Vector2d(gridCells(8), gridCells(9)),
      }),
    );
  }
}
