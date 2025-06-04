import { GameObject, resources, Vector2d } from "@/core";
import { Sprite } from "./Sprite";
import { getCharacterFrame, getCharacterWidth } from "@/constants/spriteFontMap";

const PADDING_LEFT = 10;
const PADDING_TOP = 12;

type Config = {
  content: string;
  offset: Vector2d;
  spacing?: number;
};

export class SpriteText extends GameObject {
  words: {
    wordWidth: number;
    chars: { width: number; sprite: Sprite }[];
  }[];

  constructor(public config: Config) {
    super();

    this.words = this.config.content.split(" ").map((world) => {
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
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    let cursorX = x + this.config.offset.x + PADDING_LEFT;

    this.words.forEach((word) => {
      word.chars.forEach((char) => {
        char.sprite.draw(ctx, cursorX - 5, y + this.config.offset.y + PADDING_TOP);
        cursorX += char.width + (this.config.spacing ?? 1);
      });
      cursorX += 3;
    });
  }
}
