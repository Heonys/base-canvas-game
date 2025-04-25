import { GameObject, Vector2, eventEmitter } from "@/core";

export class Camera extends GameObject {
  constructor() {
    super(new Vector2(0, 0));

    eventEmitter.on("HERO_POSITION", this, (position) => {
      const halfSize = 8;
      const canvasWidth = 320;
      const canvasHeight = 180;
      const halfWidth = -halfSize + canvasWidth / 2;
      const halfHeight = -halfSize + canvasHeight / 2;
      this.position = new Vector2(-position.x + halfWidth, -position.y + halfHeight);
    });
  }
}
