import { Direction } from "@/constants";

export class Vector2d {
  constructor(
    public x: number,
    public y: number,
  ) {}

  duplicate() {
    return new Vector2d(this.x, this.y);
  }

  equals(vector: Vector2d) {
    return vector.x === this.x && vector.y === this.y;
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  distanceTo(position: Vector2d) {
    return Math.sqrt((position.x - this.x) ** 2 + (position.y - this.y) ** 2);
  }

  toNeighbor(dir: Direction) {
    let x = this.x;
    let y = this.y;

    switch (dir) {
      case Direction.DOWN: {
        y += 16;
        break;
      }
      case Direction.UP: {
        y -= 16;
        break;
      }
      case Direction.LEFT: {
        x -= 16;
        break;
      }
      case Direction.RIGHT: {
        x += 16;
        break;
      }
    }
    return new Vector2d(x, y);
  }
}
