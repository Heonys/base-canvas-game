import { Animations, eventEmitter, FrameManager, GameObject, resources, Vector2d } from "@/core";
import { Direction } from "@/constants";
import { Overworld, Sprite } from "@/gameObject";
import { isCollision, isSolidObject, moveTowards } from "@/utils";
import { ActorFrames } from "@/animations/actor";

export class Player extends GameObject {
  direction: Direction = Direction.DOWN;
  destination: Vector2d;
  lastX?: number;
  lastY?: number;
  isLocked = false;
  body: Sprite;

  constructor(x: number, y: number) {
    super(new Vector2d(x, y));
    this.destination = this.position.duplicate();

    this.body = new Sprite({
      src: resources.images.hero,
      frameSize: new Vector2d(32, 32),
      position: new Vector2d(-8, -18),
      frameRows: 4,
      frameCols: 4,
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

  step(_delta: number, root: Overworld) {
    if (this.isLocked) return;

    const distance = moveTowards(this, this.destination, 1);
    if (distance <= 1) this.attemptMove(root);
    this.onMoved();
  }

  attemptMove(root: Overworld) {
    let nextX = this.destination.x;
    let nextY = this.destination.y;

    if (!root.keyTracker.direction) {
      this.body.animations?.play(`STAND-${this.direction}`);
      return;
    }

    switch (root.keyTracker.direction) {
      case Direction.DOWN: {
        nextY += this.tileSize;
        this.body.animations?.play("WALK-DOWN");
        break;
      }
      case Direction.UP: {
        nextY -= this.tileSize;
        this.body.animations?.play("WALK-UP");
        break;
      }
      case Direction.LEFT: {
        nextX -= this.tileSize;
        this.body.animations?.play("WALK-LEFT");
        break;
      }
      case Direction.RIGHT: {
        nextX += this.tileSize;
        this.body.animations?.play("WALK-RIGHT");
        break;
      }
    }

    this.direction = root.keyTracker.direction ?? this.direction;

    const { collisions, children } = root.sceneMap;
    if (isCollision(collisions, nextX / this.tileSize, nextY / this.tileSize)) return;
    if (isSolidObject(children, nextX, nextY)) return;

    this.destination.moveTo(nextX, nextY);
  }

  onMoved() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) return;
    this.lastX = this.position.x;
    this.lastY = this.position.y;
    eventEmitter.emit("PLAYER_POSITION", this.position);
  }
}
