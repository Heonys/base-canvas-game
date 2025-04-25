import { eventEmitter, Vector2 } from "@/core";

export class GameObject {
  children: GameObject[] = [];
  position: Vector2;
  parent: GameObject | null = null;
  hasReadyBeenCalled = false;

  constructor(position: Vector2 = new Vector2(0, 0)) {
    this.position = position;
  }

  stepEntry(delta: number, root: any) {
    // 상향식 업데이트
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }
    this.step(delta, root);
  }

  // @override
  ready() {}

  // @override
  step(_delta: number, _root: any) {}

  drawEntry(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    // 하향식 업데이트
    this.drawImage(ctx, drawPosX, drawPosY);
    this.children.forEach((child) => child.drawEntry(ctx, drawPosX, drawPosY));
  }

  // @override
  drawImage(_ctx: CanvasRenderingContext2D, _x: number, _y: number) {}

  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    eventEmitter.unsubscribe(gameObject);
    this.children = this.children.filter((child) => child !== gameObject);
  }

  destroy() {
    this.children.forEach((child) => child.destroy());
    this.parent?.removeChild(this);
  }
}
