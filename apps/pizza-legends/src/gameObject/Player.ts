import { Animations, eventEmitter, FrameManager, GameObject, resources, Vector2d } from "@/core";
import { Direction } from "@/constants";
import { Overworld, Sprite } from "@/gameObject";
import { moveTowards } from "@/utils";
import { PlayerFrames } from "@/animations/player";

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
        "STAND-DOWN": new FrameManager(PlayerFrames.stand(0)),
        "STAND-RIGHT": new FrameManager(PlayerFrames.stand(4)),
        "STAND-UP": new FrameManager(PlayerFrames.stand(8)),
        "STAND-LEFT": new FrameManager(PlayerFrames.stand(12)),
        "WALK-DOWN": new FrameManager(PlayerFrames.walk(0)),
        "WALK-RIGHT": new FrameManager(PlayerFrames.walk(4)),
        "WALK-UP": new FrameManager(PlayerFrames.walk(8)),
        "WALK-LEFT": new FrameManager(PlayerFrames.walk(12)),
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
    this.destination.x = nextX;
    this.destination.y = nextY;
  }

  onMoved() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) return;
    this.lastX = this.position.x;
    this.lastY = this.position.y;
    eventEmitter.emit("PLAYER_POSITION", this.position);
  }
}
