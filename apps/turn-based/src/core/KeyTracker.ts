import { Direction, keyToDirection } from "@/constants";

export class KeyTracker {
  keyMap = new Map<string, boolean>();
  lastKeyMap = new Map<string, boolean>();
  heldDirection: Direction[] = [];

  constructor() {
    window.addEventListener("keydown", (e) => {
      this.keyMap.set(e.code, true);
      const dir = keyToDirection[e.code];
      if (dir) this.onPress(dir);
    });

    window.addEventListener("keyup", (e) => {
      this.keyMap.set(e.code, false);
      const dir = keyToDirection[e.code];
      if (dir) this.onRelease(dir);
    });
  }

  get direction() {
    return this.heldDirection[0];
  }

  update() {
    this.lastKeyMap = new Map(this.keyMap);
  }

  getActionJustPressed(keyCode: string) {
    if (this.keyMap.get(keyCode) && !this.lastKeyMap.get(keyCode)) return true;
    return false;
  }

  onPress(dir: Direction) {
    if (!this.heldDirection.includes(dir)) {
      this.heldDirection.unshift(dir);
    }
  }

  onRelease(dir: Direction) {
    if (this.heldDirection.includes(dir)) {
      this.heldDirection = this.heldDirection.filter((it) => it !== dir);
    }
  }
}
