import { Layer } from "@/constants";
import { GameObject, resources, Vector2d } from "@/core";
import { Actor, Player, Sprite } from "@/gameObject";
import { MapObject } from "@/maps";
import { gridCells } from "@/utils";

export class Kitchen extends MapObject {
  player: GameObject;

  constructor(startPosition?: Vector2d) {
    super();

    this.addChild(
      new Sprite({
        src: resources.images["map-kitchen"],
        layer: Layer.Lower,
        frameSize: new Vector2d(this.canvasWidth, this.canvasHeight),
      }),
    );

    this.addChild(
      new Actor({
        id: "npc2",
        src: resources.images.npc2,
        position: new Vector2d(gridCells(9), gridCells(6)),
        content: "Hello Kitchen",
      }),
    );

    this.player = new Player(startPosition ?? new Vector2d(gridCells(5), gridCells(5)));
    this.addChild(this.player);
  }
}
