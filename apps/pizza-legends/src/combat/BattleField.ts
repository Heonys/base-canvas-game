import { Layer } from "@/constants";
import { resources, Vector2d } from "@/core";
import { Sprite } from "@/gameObject";
import { MapObject } from "@/maps";
import { gridCells } from "@/utils";
import { Battle } from "./Battle";
import { Pizza } from "./Pizza";

export class BattleField extends MapObject {
  constructor() {
    super(new Vector2d(88, 51));

    this.addChild(
      new Sprite({
        src: resources.images["street-battle"],
        layer: Layer.Lower,
        frameSize: new Vector2d(this.canvasWidth, this.canvasHeight),
      }),
    );

    this.addChild(
      new Sprite({
        src: resources.images.hero,
        frameSize: new Vector2d(32, 32),
        position: new Vector2d(gridCells(0), gridCells(4)),
        offset: new Vector2d(-8, -18),
        frameRows: 4,
        frameCols: 4,
        currentFrame: 8,
      }),
    );

    this.addChild(
      new Sprite({
        src: resources.images.npc3,
        frameSize: new Vector2d(32, 32),
        position: new Vector2d(gridCells(10), gridCells(2)),
        offset: new Vector2d(-8, -18),
        frameRows: 4,
        frameCols: 4,
      }),
    );

    this.addChild(
      new Pizza({
        src: resources.images.s001,
        battleType: resources.images.spicy,
        position: new Vector2d(gridCells(1), gridCells(2)),
        level: 1,
      }),
    );
    this.addChild(
      new Pizza({
        src: resources.images.v001,
        battleType: resources.images.veggie,
        position: new Vector2d(gridCells(6), gridCells(1)),
        level: 5,
      }),
    );
  }

  ready() {
    new Battle({
      onComplete: () => {},
    });
  }
}
