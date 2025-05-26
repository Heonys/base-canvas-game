import { GameObject, ImageState, Vector2d } from "@/core";

type SpriteConfig = {
  src: ImageState;
  frameSize?: Vector2d;
  offset?: Vector2d;
  position?: Vector2d;
};

export class Sprite extends GameObject {
  src: ImageState;
  offset: Vector2d;
  frameSize: Vector2d;

  constructor({ src, frameSize, offset, position }: SpriteConfig) {
    super(position);
    this.src = src;
    this.frameSize = frameSize ?? new Vector2d(16, 16);
    this.offset = offset ?? new Vector2d(0, 0);
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = this.position.x * 16 + this.offset.x;
    const y = this.position.y * 16 + this.offset.y;

    ctx.drawImage(
      this.src.image,
      0,
      0,
      this.frameSize.x,
      this.frameSize.y,
      x,
      y,
      this.frameSize.x,
      this.frameSize.y,
    );
  }
}
