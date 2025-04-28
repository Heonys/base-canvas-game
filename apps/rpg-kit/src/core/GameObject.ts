import { eventEmitter, Vector2 } from "@/core";

export class GameObject {
  canvasWidth = 320;
  canvasHeight = 180;

  children: GameObject[] = [];
  position: Vector2;
  parent: GameObject | null = null;
  hasReadyBeenCalled = false;
  isSolid = false;
  zIndex = 0;
  drawLayer: null | string = null;

  getContents?: () => { portraitFrame: number; text: string };

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
    this.getDrawChidrenOrdered().forEach((child) => child.drawEntry(ctx, drawPosX, drawPosY));
  }

  getDrawChidrenOrdered() {
    const bottoms = this.children
      .filter((child) => child.zIndex < 0)
      .sort((a, b) => a.zIndex - b.zIndex);

    const rest = this.children
      .filter((child) => child.zIndex === 0)
      .sort((a, b) => a.position.y - b.position.y);

    return [...bottoms, ...rest];
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
