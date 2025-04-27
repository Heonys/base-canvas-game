import { GameObject, Sprite, Vector2, resources } from "@/core";

export class Knight extends GameObject {
  constructor(x: number, y: number) {
    super(new Vector2(x, y));

    this.isSolid = true;

    this.addChild(
      new Sprite({
        resource: resources.images.shadow,
        frameSize: new Vector2(32, 32),
        position: new Vector2(-8, -19),
      }),
    );

    this.addChild(
      new Sprite({
        resource: resources.images.knight,
        frameSize: new Vector2(32, 32),
        position: new Vector2(-8, -20),
        frameCols: 2,
        frameRows: 1,
      }),
    );
  }
}
