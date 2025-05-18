import { Vector2d } from "@/core";

export type Config = {
  position?: Vector2d;
};

export class GameObject {
  canvasWidth = 352;
  canvasHeight = 198;

  position: Vector2d;
  children: GameObject[] = [];
  parent: GameObject | null = null;
  hasReadyBeenCalled = false;
  isSolid = false;

  constructor(config: Config) {
    this.position = config.position ?? new Vector2d(0, 0);
  }

  ready() {}

  stepEntry(delta: number, root: GameObject) {
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }
    this.step(delta, root);
  }

  step(_delta: number, _root: GameObject) {}

  drawEntry(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.draw(ctx, drawPosX, drawPosY);
    this.children.forEach((child) => child.drawEntry(ctx, drawPosX, drawPosY));
  }

  draw(_ctx: CanvasRenderingContext2D, _x: number, _y: number) {}
}
