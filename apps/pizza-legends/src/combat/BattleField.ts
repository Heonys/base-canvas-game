import { BattleType, Layer } from "@/constants";
import { resources, Vector2d } from "@/core";
import { Sprite } from "@/gameObject";
import { MapObject } from "@/maps";
import { gridCells } from "@/utils";
import { Battle } from "@/combat";

export class BattleField extends MapObject {
  constructor(onComplete?: () => void) {
    super(new Vector2d(88, 51));
    this.layer = Layer.Upper;

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

    new Battle({
      combatants: [
        {
          name: "Slice Samurai",
          team: "player",
          type: BattleType.spicy,
          src: resources.images.s001,
          icon: resources.images.spicy,
          hp: 30,
          maxHp: 50,
          exp: 75,
          level: 7,
          status: null,
        },
        {
          name: "Call Me Kale",
          team: "enemy",
          type: BattleType.veggie,
          src: resources.images.v001,
          icon: resources.images.veggie,
          hp: 20,
          maxHp: 50,
          exp: 20,
          level: 11,
          status: null,
        },
      ],
      onComplete,
      field: this,
    });
  }

  ready() {}
}
