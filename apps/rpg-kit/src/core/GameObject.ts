import { Vector2 } from "./Vector2";

export class GameObject {
  private children: GameObject[] = [];
  position: Vector2 = new Vector2(0, 0);
  parent: GameObject | null = null;

  constructor(position: Vector2) {
    this.position = position;
  }

  stepEntry(delta: number, root: any) {
    this.children.forEach((child) => child.stepEntry(delta, root));
    this.step(delta, root);
  }

  // @override
  step(_delta: number, _root: any) {}

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  // @override
  drawImage(_ctx: CanvasRenderingContext2D, _x: number, _y: number) {}

  addChild(gameObject: GameObject) {
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    this.children = this.children.filter((child) => child !== gameObject);
  }
}
