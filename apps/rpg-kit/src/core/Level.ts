import { GameObject, Sprite, Vector2 } from "@/core";

export class Level extends GameObject {
  walls: Set<string> = new Set();
  background: Sprite | null = null;
  startPosition: Vector2 = new Vector2(0, 0);

  constructor() {
    super();
  }
}
