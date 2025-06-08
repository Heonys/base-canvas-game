import { Layer } from "@/constants";
import { getCharacterFrame, getCharacterWidth } from "@/constants/spriteFontMap";
import { eventEmitter, GameObject, resources, Vector2d } from "@/core";
import { Overworld, Sprite } from "@/gameObject";

const MAX_WIDTH = 250;
const PADDING_LEFT = 10;
const PADDING_TOP = 12;
const LINE_HEIGHT = 20;

export class TextBox extends GameObject {
  backdrop: Sprite;

  showingIndex = 0;
  finalIndex = 0;
  textSpeed = 80;
  timeUntilNextShow = this.textSpeed;

  words: {
    wordWidth: number;
    chars: { width: number; sprite: Sprite }[];
  }[];

  constructor(public content: string) {
    super(new Vector2d(48, 110));
    this.layer = Layer.Upper;

    this.backdrop = new Sprite({
      src: resources.images.textBox,
      frameSize: new Vector2d(256, 64),
    });

    this.words = this.content.split(" ").map((world) => {
      let wordWidth = 0;

      const chars = [...world].map((char) => {
        const charWidth = getCharacterWidth(char);
        wordWidth += charWidth;

        return {
          width: charWidth,
          sprite: new Sprite({
            src: resources.images.fontWhite,
            currentFrame: getCharacterFrame(char),
            frameCols: 13,
            frameRows: 6,
          }),
        };
      });
      return { wordWidth, chars };
    });

    this.finalIndex = this.words.reduce((acc, cur) => {
      return acc + cur.chars.length;
    }, 0);
  }

  step(delta: number, root: Overworld) {
    if (root.keyTracker.getActionJustPressed("Space")) {
      if (this.showingIndex < this.finalIndex) {
        this.showingIndex = this.finalIndex;
        return;
      } else {
        eventEmitter.emit("END_TEXT_BOX");
      }
    }

    this.timeUntilNextShow -= delta;
    if (this.timeUntilNextShow <= 0) {
      this.showingIndex += 1;
      this.timeUntilNextShow = this.textSpeed;
    }
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.backdrop.draw(ctx, x, y);

    let cursorX = x + PADDING_LEFT;
    let cursorY = y + PADDING_TOP;
    let currentShowingIndex = 0;

    this.words.forEach((word) => {
      const spaceRemaining = x + MAX_WIDTH - cursorX;
      if (spaceRemaining < word.wordWidth) {
        cursorY += LINE_HEIGHT;
        cursorX = x + PADDING_LEFT;
      }
      word.chars.forEach((char) => {
        if (currentShowingIndex > this.showingIndex) return;
        char.sprite.draw(ctx, cursorX - 5, cursorY);
        cursorX += char.width + 1;
        currentShowingIndex += 1;
      });
      cursorX += 3;
    });
  }
}
