import { eventEmitter, GameObject, Vector2d } from "@/core";

export class Camera extends GameObject {
  constructor() {
    super();
    eventEmitter.on("PLAYER_POSITION", this, this.centerPositionOnTarget);
  }

  centerPositionOnTarget = (position: Vector2d) => {
    const x = -position.x + this.tileSize / 2 + this.canvasWidth / 2;
    const y = -position.y + this.tileSize / 2 + this.canvasHeight / 2;
    this.position = new Vector2d(x, y);
  };
}
