import { eventEmitter, Level, resources, Sprite, Vector2, Flag } from "@/core";
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
    this.addChild(
      new Knight({
        position: new Vector2(gridCells(9), gridCells(5)),
        portraitFrame: 0,
        scenarios: [
          {
            text: "I just can't stand that guy.",
            requires: [Flag.TALKED_TO_B],
            bypass: [Flag.TALKED_TO_A],
            addFlag: [Flag.TALKED_TO_A],
          },
          {
            text: "He is just the worst!",
            requires: [Flag.TALKED_TO_A],
          },
          {
            text: "Grumble grumble. Another day at work.",
          },
        ],
      }),
    );

    this.addChild(
      new Knight({
        position: new Vector2(gridCells(12), gridCells(5)),
        portraitFrame: 1,
        scenarios: [
          {
            text: "What a wonderful day at work in the cave!",
            addFlag: [Flag.TALKED_TO_B],
          },
        ],
      }),
    );

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
