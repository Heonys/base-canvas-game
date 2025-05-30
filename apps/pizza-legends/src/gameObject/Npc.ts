import { Animations, FrameManager, GameObject, ImageState, resources, Vector2d } from "@/core";
import { ActorFrames } from "@/animations/actor";
import { Overworld, Sprite } from "@/gameObject";
import { moveTowards } from "@/utils";
import { Direction } from "@/constants";

type NpcConfig = {
  src: ImageState;
  position: Vector2d;
  behaviors?: Behavor[];
};
type Behavor = { type: string; destination: Vector2d };

export class Npc extends GameObject {
  direction: Direction = Direction.DOWN;
  body: Sprite;

  behaviors: Behavor[];
  behaviorIndex = 0;
  isBehaviorDone = false;
  speed = 1;

  constructor(config: NpcConfig) {
    super(config.position);
    this.isSolid = true;
    this.behaviors = config.behaviors ?? [];

    this.body = new Sprite({
      src: config.src,
      frameSize: new Vector2d(32, 32),
      position: new Vector2d(-8, -18),
      frameCols: 4,
      frameRows: 4,
      animations: new Animations({
        "STAND-DOWN": new FrameManager(ActorFrames.stand(0)),
        "STAND-RIGHT": new FrameManager(ActorFrames.stand(4)),
        "STAND-UP": new FrameManager(ActorFrames.stand(8)),
        "STAND-LEFT": new FrameManager(ActorFrames.stand(12)),
        "WALK-DOWN": new FrameManager(ActorFrames.walk(0)),
        "WALK-RIGHT": new FrameManager(ActorFrames.walk(4)),
        "WALK-UP": new FrameManager(ActorFrames.walk(8)),
        "WALK-LEFT": new FrameManager(ActorFrames.walk(12)),
      }),
    });

    this.addChild(this.body);
    this.addChild(
      new Sprite({
        src: resources.images.shadow,
        frameSize: new Vector2d(32, 32),
        position: new Vector2d(-8, -18),
      }),
    );
  }

  step(_delta: number, root: Overworld): void {
    if (this.behaviors.length === 0 || this.isBehaviorDone) return;

    const behavior = this.behaviors[this.behaviorIndex];
    if (root.player.position.distanceTo(this.position) < this.tileSize) return;

    const distance = moveTowards(this, behavior.destination, this.speed);
    this.body.animations?.play(behavior.type);

    if (distance <= 1) {
      this.position.moveTo(behavior.destination.x, behavior.destination.y);
      this.behaviorIndex++;
      if (this.behaviorIndex === this.behaviors.length) {
        this.behaviorIndex = 0;
      }
    }
  }
}
