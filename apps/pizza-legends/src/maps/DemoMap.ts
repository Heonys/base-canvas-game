import { Layer } from "@/constants";
import { eventEmitter, GameObject, resources, Vector2d } from "@/core";
import { Actor, Player, Sprite } from "@/gameObject";
import { MapObject, Kitchen } from "@/maps";
import { gridCells } from "@/utils";

export class DemoMap extends MapObject {
  player: GameObject;

  constructor(startPosition?: Vector2d) {
    super();

    this.collisions = new Set(["7,6", "8,6", "7,7", "8,7"]);
    this.addChild(
      new Sprite({
        src: resources.images["demo-map"],
        layer: Layer.Lower,
        frameSize: new Vector2d(this.canvasWidth, this.canvasHeight),
      }),
    );
    this.addChild(
      new Sprite({
        src: resources.images["demo-map-upper"],
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

    this.player = new Player(startPosition ?? new Vector2d(gridCells(5), gridCells(6)));
    this.addChild(this.player);
  }

  ready() {
    const exit = new Vector2d(gridCells(5), gridCells(10));
    eventEmitter.on("PLAYER_POSITION", this, (position) => {
      if (position.equals(exit)) {
        eventEmitter.emit("CHANGE_SCENE", new Kitchen());
      }
    });
  }
}
