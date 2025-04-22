import { Vector2 } from "@/core/Vector2";
import type { ImageState } from "@/core/Resources";

type SpriteOptions = {
  resource: ImageState;
  frameSize?: Vector2;
  frameCols?: number;
  frameRows?: number;
  currentFrame?: number;
  position?: Vector2;
  scale?: number;
};

export class Sprite {
  private frameMap = new Map<number, Vector2>();
  private resource: ImageState;
  private frameSize: Vector2;
  private frameCols: number;
  private frameRows: number;
  private scale: number;
  currentFrame: number;
  position: Vector2;

  constructor({
    resource,
    frameSize = new Vector2(16, 16),
    frameCols = 1,
    frameRows = 1,
    currentFrame = 0,
    position = new Vector2(0, 0),
    scale = 1,
  }: SpriteOptions) {
    this.resource = resource;
    this.frameSize = frameSize;
    this.frameCols = frameCols;
    this.frameRows = frameRows;
    this.currentFrame = currentFrame;
    this.position = position;
    this.scale = scale;

    this.buildFrameMap();
  }

  private buildFrameMap() {
    let frameCount = 0;
    for (let y = 0; y < this.frameRows; y++) {
      for (let x = 0; x < this.frameCols; x++) {
        this.frameMap.set(frameCount, {
          x: this.frameSize.x * x,
          y: this.frameSize.y * y,
        } as Vector2);
        frameCount++;
      }
    }
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.resource.isLoaded) return;

    let sourceX = 0;
    let sourceY = 0;
    const frame = this.frameMap.get(this.currentFrame);
    if (frame) {
      sourceX = frame.x;
      sourceY = frame.y;
    }

    ctx.drawImage(
      this.resource.image,
      sourceX,
      sourceY,
      this.frameSize.x,
      this.frameSize.y,
      x,
      y,
      this.frameSize.x * this.scale,
      this.frameSize.y * this.scale,
    );
  }
}
