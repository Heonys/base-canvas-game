import { Layer } from "@/constants";
import { GameObject, ImageState, Vector2d, Animations } from "@/core";

type SpriteConfig = {
  src: ImageState;
  frameSize?: Vector2d;
  position?: Vector2d;
  currentFrame?: number;
  animations?: Animations;
  frameRows?: number;
  frameCols?: number;
  layer?: Layer;
};

export class Sprite extends GameObject {
  src: ImageState;
  frameSize: Vector2d;
  currentFrame: number;
  frameMap = new Map<number, Vector2d>();
  animations?: Animations;

  constructor({
    src,
    position,
    frameSize = new Vector2d(16, 16),
    currentFrame = 0,
    frameRows = 1,
    frameCols = 1,
    animations,
    layer,
  }: SpriteConfig) {
    super(position);
    this.src = src;
    this.layer = layer ?? Layer.Main;
    this.frameSize = frameSize;
    this.currentFrame = currentFrame;
    this.animations = animations;
    this.buildFrameMap(frameRows, frameCols);
  }

  buildFrameMap(rows: number, cols: number) {
    let frameCount = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        this.frameMap.set(frameCount, new Vector2d(x * this.frameSize.x, y * this.frameSize.y));
        frameCount++;
      }
    }
  }

  step(delta: number): void {
    if (!this.animations) return;

    this.animations.step(delta);
    this.currentFrame = this.animations.frame;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.src.isLoaded) return;
    const frame = this.frameMap.get(this.currentFrame);

    ctx.drawImage(
      this.src.image,
      frame?.x ?? 0,
      frame?.y ?? 0,
      this.frameSize.x,
      this.frameSize.y,
      x,
      y,
      this.frameSize.x,
      this.frameSize.y,
    );
  }
}
