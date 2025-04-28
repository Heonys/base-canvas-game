import { Sprite, Vector2, resources } from "@/core";
import { Npc, NpcConfig } from "@/gameObjects";

export class Knight extends Npc {
  constructor(config: NpcConfig) {
    super(config);

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
      }),
    );
  }
}
