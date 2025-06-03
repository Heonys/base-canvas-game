import {
  Animations,
  eventEmitter,
  FrameManager,
  GameObject,
  ImageState,
  resources,
  store,
  Vector2d,
} from "@/core";
import { ActorFrames } from "@/animations/actor";
import { Overworld, Sprite } from "@/gameObject";
import { gridCells, moveTowards } from "@/utils";
import { Behavior, Direction } from "@/constants";

type ActorConfig = {
  id: string;
  src: ImageState;
  position: Vector2d;
  content?: string;
};

export class Actor extends GameObject {
  direction: Direction = Direction.DOWN;
  body: Sprite;
  behavior?: Behavior;
  speed = 1;
  waitTime = 0;
  content?: string;

  constructor(config: ActorConfig) {
    super(config.position);
    this.isSolid = true;
    this.content = config.content;
    store.register(config.id, this);

    this.body = new Sprite({
      src: config.src,
      frameSize: new Vector2d(32, 32),
      position: new Vector2d(-8, -18),
      frameCols: 4,
      frameRows: 4,
      animations: new Animations({
        "stand-down": new FrameManager(ActorFrames.stand(0)),
        "stand-right": new FrameManager(ActorFrames.stand(4)),
        "stand-up": new FrameManager(ActorFrames.stand(8)),
        "stand-left": new FrameManager(ActorFrames.stand(12)),
        "walk-down": new FrameManager(ActorFrames.walk(0)),
        "walk-right": new FrameManager(ActorFrames.walk(4)),
        "walk-up": new FrameManager(ActorFrames.walk(8)),
        "walk-left": new FrameManager(ActorFrames.walk(12)),
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

  step(delta: number, root: Overworld) {
    if (root.isPause) return;
    if (!root.isCutscene) {
      this.body.animations?.play(`stand-${this.direction}`);
      return;
    }

    const behavior = this.behavior;
    if (!behavior) return;
    if (root.player.position.distanceTo(this.position) < this.tileSize) return;
    this.body.animations?.play(`${behavior.type}-${behavior.dir}`);

    switch (behavior.type) {
      case "walk": {
        const [x, y] = behavior.destination;
        const distance = moveTowards(this, new Vector2d(gridCells(x), gridCells(y)), this.speed);

        if (distance <= 1) {
          this.position.moveTo(gridCells(x), gridCells(y));
          eventEmitter.emit("COMPLATE_WALK", this);
        }
        break;
      }
      case "stand": {
        this.direction = behavior.dir;
        if (this.waitTime === 0) {
          this.waitTime = behavior.duration;
        }
        this.waitTime -= delta;
        if (this.waitTime > 0) return;
        this.waitTime = 0;
        eventEmitter.emit("COMPLATE_STAND", this);
        break;
      }
    }
  }

  getContents() {
    return this.content ?? null;
  }
}
