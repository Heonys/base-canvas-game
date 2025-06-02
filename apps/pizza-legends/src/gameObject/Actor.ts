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
import { Direction } from "@/constants";

type ActorConfig = {
  id: string;
  src: ImageState;
  position: Vector2d;
  iteration?: number;
  behaviors?: Behavior[];
};
type Behavior =
  | { type: "WALK"; dir: Direction; destination: [x: number, y: number] }
  | { type: "STAND"; dir: Direction; duration: number };

export class Actor extends GameObject {
  direction: Direction = Direction.DOWN;
  body: Sprite;

  iteration: number;
  currentIteration = 0;
  behaviors: Behavior[];
  behaviorIndex = 0;
  speed = 1;
  waitTime = 0;

  isOverriding = false;
  overrideBehaviors: Behavior[] = [];

  constructor(config: ActorConfig) {
    super(config.position);
    this.isSolid = true;
    store.register(config.id, this);
    this.behaviors = config.behaviors ?? [];
    this.iteration = config.iteration ?? 1;

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

  step(delta: number, root: Overworld) {
    if (root.isPause) return;

    if (this.currentIteration >= this.iteration) {
      this.body.animations?.play(`STAND-${this.currentBehaviors[this.behaviorIndex - 1].dir}`);
      return;
    }

    if (this.currentBehaviors.length === 0) return;
    const behavior = this.currentBehaviors[this.behaviorIndex];
    if (root.player.position.distanceTo(this.position) < this.tileSize) return;

    switch (behavior.type) {
      case "WALK": {
        this.body.animations?.play(`${behavior.type}-${behavior.dir}`);
        const [x, y] = behavior.destination;
        const distance = moveTowards(this, new Vector2d(gridCells(x), gridCells(y)), this.speed);

        if (distance <= 1) {
          this.position.moveTo(gridCells(x), gridCells(y));
          eventEmitter.emit("COMPLATE_WALK", this);
          this.behaviorIndex++;
          if (this.behaviorIndex === this.behaviors.length) {
            this.behaviorIndex = 0;
            this.currentIteration++;
          }
        }
        break;
      }
      case "STAND": {
        this.body.animations?.play(`${behavior.type}-${behavior.dir}`);

        if (this.waitTime === 0) {
          this.waitTime = behavior.duration;
        }
        this.waitTime -= delta;
        if (this.waitTime > 0) return;
        this.waitTime = 0;
        eventEmitter.emit("COMPLATE_STAND", this);

        this.behaviorIndex++;
        if (this.behaviorIndex === this.behaviors.length) {
          this.behaviorIndex = 0;
          this.currentIteration++;
        }
        break;
      }
    }
  }

  get currentBehaviors() {
    return this.isOverriding ? this.overrideBehaviors : this.behaviors;
  }

  pushBehaviors(behaviors: Behavior[]) {
    this.overrideBehaviors = behaviors;
    this.behaviorIndex = 0;
    this.currentIteration = 0;
    this.isOverriding = true;
  }
}
