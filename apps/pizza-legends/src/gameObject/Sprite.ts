import { GameObject, ImageState, Vector2d, Animations } from "@/core";
import { Overworld } from "./Overworld";

type SpriteConfig = {
  src: ImageState;
  frameSize?: Vector2d;
  position?: Vector2d;
  animations?: Animations;
};

export class Sprite extends GameObject {
  src: ImageState;
  frameSize: Vector2d;
  animations?: Animations;

  constructor({ src, frameSize, position, animations }: SpriteConfig) {
    super(position);
    this.src = src;
    this.frameSize = frameSize ?? new Vector2d(16, 16);
    this.animations = animations;
  }

  step(_delta: number, _root: Overworld): void {
    if (!this.animations) return;
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
