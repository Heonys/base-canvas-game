import { Vector2d, eventEmitter, store } from "@/core";
import { Direction, Layer } from "@/constants";
import type { Overworld } from "@/gameObject";

export class GameObject {
  canvasWidth = 352;
  canvasHeight = 198;

  direction: Direction = Direction.DOWN;
  position: Vector2d;
  children: GameObject[] = [];
  parent: GameObject | null = null;
  hasReadyBeenCalled = false;
  isSolid = false;
  layer: Layer = Layer.Main;
  tileSize = 16;
  timers: { remaining: number; callback: () => void }[] = [];

  constructor(position?: Vector2d) {
    this.position = position ?? new Vector2d(0, 0);
  }

  wait(ms: number, callback: () => void) {
    this.timers.push({ remaining: ms, callback });
  }

  ready() {}

  stepEntry(delta: number, root: Overworld) {
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }
    this.step(delta, root);
  }

  step(_delta: number, _root: Overworld) {}

  drawEntry(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.draw(ctx, drawPosX, drawPosY);
    this.children.forEach((child) => child.drawEntry(ctx, drawPosX, drawPosY));
  }

  draw(_ctx: CanvasRenderingContext2D, _x: number, _y: number) {}

  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    eventEmitter.unsubscribe(gameObject);
    store.remove(gameObject);
    this.children = this.children.filter((child) => child !== gameObject);
  }

  destroy() {
    this.children.forEach((child) => child.destroy());
    this.parent?.removeChild(this);
  }

  getContents(): null | string {
    return null;
  }

  setDirection(dir: Direction) {
    this.direction = dir;
  }
}
