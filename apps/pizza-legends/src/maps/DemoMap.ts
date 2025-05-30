import { resources, Vector2d } from "@/core";
import { Npc, Sprite } from "@/gameObject";
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
      new Npc({
        src: resources.images.npc,
        position: new Vector2d(gridCells(8), gridCells(8)),
        behaviors: [
          { type: "WALK-LEFT", destination: new Vector2d(gridCells(3), gridCells(8)) },
          { type: "WALK-UP", destination: new Vector2d(gridCells(3), gridCells(3)) },
          { type: "WALK-RIGHT", destination: new Vector2d(gridCells(8), gridCells(3)) },
          { type: "WALK-DOWN", destination: new Vector2d(gridCells(8), gridCells(8)) },
        ],
      }),
    );
  }
}
