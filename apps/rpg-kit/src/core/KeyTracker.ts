export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export class KeyTracker {
  private heldDirections: Direction[] = [];

  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onPress(Direction.UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onPress(Direction.DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onPress(Direction.LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onPress(Direction.RIGHT);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onRelease(Direction.UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onRelease(Direction.DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onRelease(Direction.LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onRelease(Direction.RIGHT);
      }
    });
  }

  get direction() {
    return this.heldDirections[0];
  }

  private onPress(dir: Direction) {
    if (!this.heldDirections.includes(dir)) {
      this.heldDirections.unshift(dir);
    }
  }

  private onRelease(dir: Direction) {
    const index = this.heldDirections.indexOf(dir);
    if (index > -1) {
      this.heldDirections.splice(index, 1);
    }
  }
}
