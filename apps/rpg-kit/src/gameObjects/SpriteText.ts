import { GameObject, resources, Sprite, Vector2 } from "@/core";

export class SpriteText extends GameObject {
  backdrop: Sprite;

  constructor(public content: string) {
    super(new Vector2(32, 112));

    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });

    // const sprite = new Sprite({
    //   resource: resources.images.fontWhite,
    //   frameCols: 13,
    //   frameRows: 6,
    // });
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.backdrop.drawImage(ctx, x, y);
  }
}
