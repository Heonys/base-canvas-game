import { GameObject, resources, Sprite, Vector2 } from "@/core";

const MAX_WIDTH = 250;
const PADDING_LEFT = 10;
const PADDING_TOP = 12;
const LINE_HEIGHT = 20;

export class TextBox extends GameObject {
  contents: string = "Hello Canvas Hello Canvas Hello Canvas";
  backdrop: Sprite;

  constructor() {
    super(new Vector2(32, 112));

    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.backdrop.drawImage(ctx, x, y);

    ctx.font = "8px Retro";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#fff";

    const worlds = this.contents.split(" ");
    let line = "";

    for (let n = 0; n < worlds.length; n++) {
      const testLine = `${line}${worlds[n]} `;
      if (ctx.measureText(testLine).width <= MAX_WIDTH) {
        line = testLine;
      } else {
        ctx.fillText(line, x + PADDING_LEFT, y + PADDING_TOP);
        y += LINE_HEIGHT;
        line = `${worlds[n]} `;
      }
    }
    ctx.fillText(line, x + PADDING_LEFT, y + PADDING_TOP);
  }
}
