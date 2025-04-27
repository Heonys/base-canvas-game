import { eventEmitter, Level, resources, Sprite, Vector2 } from "@/core";
import { Hero, Exit, Rod, Knight } from "@/gameObjects";
import { gridCells } from "@/utils";
import { Outdoor } from "@/level";

const DEFAULT_START_POSITION = new Vector2(gridCells(6), gridCells(5));

export class Cave extends Level {
  constructor(startPosition?: Vector2) {
    super();

    this.background = new Sprite({
      resource: resources.images.cave,
      frameSize: new Vector2(this.canvasWidth, this.canvasHeight),
    });

    this.addChild(
      new Sprite({
        resource: resources.images.caveGround,
        frameSize: new Vector2(this.canvasWidth, this.canvasHeight),
        zIndex: -999,
      }),
    );
    this.addChild(new Exit(gridCells(3), gridCells(5)));
    this.addChild(new Knight(gridCells(10), gridCells(5)));

    this.startPosition = startPosition ?? DEFAULT_START_POSITION;
    this.addChild(new Hero(this.startPosition.x, this.startPosition.y));

    this.addChild(new Rod(gridCells(9), gridCells(6)));
  }

  override ready() {
    eventEmitter.on("HERO_EXIT", this, () => {
      eventEmitter.emit("CHANGE_LEVEL", new Outdoor(new Vector2(gridCells(6), gridCells(4))));
    });
  }
}
