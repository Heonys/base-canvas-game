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
}
