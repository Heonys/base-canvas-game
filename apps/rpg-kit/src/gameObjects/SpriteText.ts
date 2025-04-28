import { getCharacterWidth, getCharacterFrame } from "@/constant/spriteFontMap";
import { eventEmitter, GameObject, resources, Sprite, Vector2 } from "@/core";
import { Main } from "@/gameObjects";

const MAX_WIDTH = 240;
const PADDING_LEFT = 28;
const PADDING_TOP = 10;
const LINE_HEIGHT = 15;

export class SpriteText extends GameObject {
  backdrop: Sprite;
  portrait: Sprite;
  words: {
    wordWidth: number;
    chars: { width: number; sprite: Sprite }[];
  }[];
  showingIndex = 0;
  finalIndex = 0;
  textSpeed = 80;
  timeUntilNextShow = this.textSpeed;

  constructor(
    public content: string,
    portraitFrame: number,
  ) {
    super(new Vector2(32, 112));
    this.drawLayer = "HUD";

    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });

    this.words = this.content.split(" ").map((world) => {
      let wordWidth = 0;

      const chars = [...world].map((char) => {
        const charWidth = getCharacterWidth(char);
        wordWidth += charWidth;

        return {
          width: charWidth,
          sprite: new Sprite({
            resource: resources.images.fontWhite,
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

    this.portrait = new Sprite({
      resource: resources.images.portraits,
      frameCols: 4,
      currentFrame: portraitFrame,
    });
  }

  override step(delta: number, root: Main) {
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

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.backdrop.drawImage(ctx, x, y);
    this.portrait.drawImage(ctx, x + 6, y + 6);

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
        char.sprite.drawImage(ctx, cursorX - 5, cursorY);
        cursorX += char.width + 1;
        currentShowingIndex += 1;
      });
      cursorX += 3;
    });
  }
}
