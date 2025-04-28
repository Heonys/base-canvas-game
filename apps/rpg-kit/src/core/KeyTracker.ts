export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export class KeyTracker {
  keyMap = new Map<string, boolean>();
  lastKeyMap = new Map<string, boolean>();

  private heldDirections: Direction[] = [];

  constructor() {
    document.addEventListener("keydown", (e) => {
      this.keyMap.set(e.code, true);

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
      this.keyMap.set(e.code, false);

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

  update() {
    this.lastKeyMap = new Map(this.keyMap);
  }

  getActionJustPressed(keyCode: string) {
    if (this.keyMap.get(keyCode) && !this.lastKeyMap.get(keyCode)) return true;
    return false;
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
