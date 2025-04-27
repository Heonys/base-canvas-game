import { eventEmitter, Level, resources, Sprite, Vector2 } from "@/core";
import { Exit, Hero, Rod } from "@/gameObjects";
import { gridCells } from "@/utils";
import { Cave } from "@/level";

const DEFAULT_START_POSITION = new Vector2(gridCells(6), gridCells(5));

export class Outdoor extends Level {
  constructor(startPosition?: Vector2) {
    super();
    this.background = new Sprite({
      resource: resources.images.sky,
      frameSize: new Vector2(this.canvasWidth, this.canvasHeight),
    });

    this.addChild(
      new Sprite({
        resource: resources.images.ground,
        frameSize: new Vector2(this.canvasWidth, this.canvasHeight),
        zIndex: -999,
      }),
    );
    this.addChild(new Exit(gridCells(6), gridCells(3)));

    this.startPosition = startPosition ?? DEFAULT_START_POSITION;
    this.addChild(new Hero(this.startPosition.x, this.startPosition.y));

    this.addChild(new Rod(gridCells(7), gridCells(6)));
    this.addChild(new Rod(gridCells(9), gridCells(6)));

    this.createWalls();
  }
  override ready() {
    eventEmitter.on("HERO_EXIT", this, () => {
      eventEmitter.emit("CHANGE_LEVEL", new Cave(new Vector2(gridCells(3), gridCells(6))));
    });
  }

  createWalls() {
    this.walls.add(`64,48`); // tree
    this.walls.add(`64,64`); // squares
    this.walls.add(`64,80`);
    this.walls.add(`80,64`);
    this.walls.add(`80,80`);
    this.walls.add(`112,80`); // water
    this.walls.add(`128,80`);
    this.walls.add(`144,80`);
    this.walls.add(`160,80`);
  }
}
