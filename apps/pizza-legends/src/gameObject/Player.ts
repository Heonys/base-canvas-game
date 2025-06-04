import {
  Animations,
  eventEmitter,
  FrameManager,
  GameObject,
  resources,
  store,
  Vector2d,
} from "@/core";
import { Direction } from "@/constants";
import { Overworld, Sprite } from "@/gameObject";
import { isCollision, isSolidObject, moveTowards, oppositeDirection } from "@/utils";
import { ActorFrames } from "@/animations/actor";

export class Player extends GameObject {
  destination: Vector2d;
  lastX?: number;
  lastY?: number;
  body: Sprite;

  constructor(postion: Vector2d) {
    super(postion);
    store.register("player", this);
    this.destination = this.position.duplicate();

    this.body = new Sprite({
      src: resources.images.hero,
      frameSize: new Vector2d(32, 32),
      position: new Vector2d(-8, -18),
      frameRows: 4,
      frameCols: 4,
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

    this.addChild(
      new Sprite({
        src: resources.images.shadow,
        frameSize: new Vector2d(32, 32),
        position: new Vector2d(-8, -18),
      }),
    );
    this.addChild(this.body);
  }
  ready() {
    eventEmitter.emit("PLAYER_POSITION", this.position);
  }

  step(_delta: number, root: Overworld) {
    if (root.isPause || root.isCutscene) return;

    if (root.keyTracker.getActionJustPressed("Space")) {
      Array.from(store.values()).forEach((gameobject) => {
        if (gameobject.position.equals(this.position.toNeighbor(this.direction))) {
          gameobject.setDirection(oppositeDirection(this.direction));
          eventEmitter.emit("OPEN_TEXT_BOX", gameobject);
        }
      });
    }

    const distance = moveTowards(this, this.destination, 1);
    if (distance <= 1) this.attemptMove(root);
    this.onMoved();
  }

  attemptMove(root: Overworld) {
    let nextX = this.destination.x;
    let nextY = this.destination.y;

    if (!root.keyTracker.direction) {
      this.body.animations?.play(`stand-${this.direction}`);
      return;
    }

    switch (root.keyTracker.direction) {
      case Direction.DOWN: {
        nextY += this.tileSize;
        this.body.animations?.play("walk-down");
        break;
      }
      case Direction.UP: {
        nextY -= this.tileSize;
        this.body.animations?.play("walk-up");
        break;
      }
      case Direction.LEFT: {
        nextX -= this.tileSize;
        this.body.animations?.play("walk-left");
        break;
      }
      case Direction.RIGHT: {
        nextX += this.tileSize;
        this.body.animations?.play("walk-right");
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
