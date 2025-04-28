import { Direction } from "@/core";

// 2차원 공간에서 (x, y) 좌표를 갖는 벡터로 방향과 크기를 가진 개념
export class Vector2 {
  constructor(
    public x = 0,
    public y = 0,
  ) {}

  duplicate() {
    return new Vector2(this.x, this.y);
  }

  matches(otherVector: Vector2) {
    return this.x === otherVector.x && this.y === otherVector.y;
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
    return new Vector2(x, y);
  }
}
