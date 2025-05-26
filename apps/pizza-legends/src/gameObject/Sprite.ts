import { GameObject, ImageState, Vector2d } from "@/core";

type SpriteConfig = {
  src: ImageState;
  frameSize?: Vector2d;
  position?: Vector2d;
};

export class Sprite extends GameObject {
  src: ImageState;
  frameSize: Vector2d;

  constructor({ src, frameSize, position }: SpriteConfig) {
    super(position);
    this.src = src;
    this.frameSize = frameSize ?? new Vector2d(16, 16);
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
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
