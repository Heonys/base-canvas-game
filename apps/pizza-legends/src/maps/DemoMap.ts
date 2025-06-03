import { Layer } from "@/constants";
import { GameObject, resources, Vector2d } from "@/core";
import { Actor, Player, Sprite } from "@/gameObject";
import { MapObject } from "@/maps";
import { gridCells } from "@/utils";

export class DemoMap extends MapObject {
  player: GameObject;

  constructor() {
    super();

    this.collisions = new Set(["7,6", "8,6", "7,7", "8,7"]);
    this.addChild(
      new Sprite({
        src: resources.images.map,
        layer: Layer.Lower,
        frameSize: new Vector2d(this.canvasWidth, this.canvasHeight),
      }),
    );
    this.addChild(
      new Sprite({
        src: resources.images.map2,
        layer: Layer.Upper,
        frameSize: new Vector2d(this.canvasWidth, this.canvasHeight),
      }),
    );
    this.addChild(
      new Actor({
        id: "npc1",
        src: resources.images.npc,
        position: new Vector2d(gridCells(8), gridCells(9)),
        content: "What a wonderful day at work in the cave!",
      }),
    );

    this.player = new Player(gridCells(5), gridCells(6));
    this.addChild(this.player);
  }
}
