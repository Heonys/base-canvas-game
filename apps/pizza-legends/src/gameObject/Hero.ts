import { resources, Vector2d } from "@/core";
import { Actor, Sprite } from "@/gameObject";

export class Hero extends Actor {
  constructor(position?: Vector2d) {
    super(position);

    this.addChild(
      new Sprite({
        src: resources.images.hero,
        frameSize: new Vector2d(32, 32),
        position: new Vector2d(-8, -18),
      }),
    );
    this.addChild(
      new Sprite({
        src: resources.images.shadow,
        frameSize: new Vector2d(32, 32),
        position: new Vector2d(-8, -18),
      }),
    );
  }
}
