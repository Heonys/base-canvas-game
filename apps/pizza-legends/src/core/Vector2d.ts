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
}
