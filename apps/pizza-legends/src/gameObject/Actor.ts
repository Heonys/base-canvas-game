import { GameObject, Vector2d } from "@/core";
import { Direction } from "@/constants";
import { Overworld } from "@/gameObject";
import { moveTowards } from "@/utils";

export class Actor extends GameObject {
  direction: Direction = Direction.DOWN;
  destination: Vector2d;
  lastX?: number;
  lastY?: number;
  isLocked = false;

  constructor(position?: Vector2d) {
    super(position);
    this.destination = this.position.duplicate();
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

    switch (root.keyTracker.direction) {
      case Direction.DOWN: {
        nextY += this.tileSize;
        break;
      }
      case Direction.UP: {
        nextY -= this.tileSize;
        break;
      }
      case Direction.LEFT: {
        nextX -= this.tileSize;
        break;
      }
      case Direction.RIGHT: {
        nextX += this.tileSize;
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
  }
}
