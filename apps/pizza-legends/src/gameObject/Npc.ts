import { GameObject, ImageState, resources, Vector2d } from "@/core";
import { Sprite } from "@/gameObject";

type NpcConfig = {
  src: ImageState;
  position: Vector2d;
};

export class Npc extends GameObject {
  constructor(config: NpcConfig) {
    super(config.position);

    this.addChild(
      new Sprite({
        src: config.src,
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
