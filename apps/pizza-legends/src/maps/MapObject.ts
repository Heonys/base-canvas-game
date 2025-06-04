import { Layer } from "@/constants";
import { GameObject } from "@/core";
import { Sprite } from "@/gameObject";

export abstract class MapObject extends GameObject {
  abstract player: GameObject;

  collisions = new Set<`${number},${number}`>();
  background?: Sprite;

  constructor() {
    super();
    this.layer = Layer.Lower;
  }

  drawEntry(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.draw(ctx, drawPosX, drawPosY);

    [Layer.Lower, Layer.Main, Layer.Upper].forEach((layer) => {
      const sortedChildren = this.children
        .filter((child) => child.layer === layer)
        .sort((a, b) => a.position.y - b.position.y);

      sortedChildren.forEach((child) => {
        child.drawEntry(ctx, drawPosX, drawPosY);
      });
    });
  }
}
