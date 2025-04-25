import { Camera, eventEmitter, GameObject, KeyTracker, Level } from "@/core";
import { Inventory } from "@/gameObjects";
import { Cave } from "@/level";

export class Main extends GameObject {
  keyTracker: KeyTracker;
  camera: Camera;
  inven: GameObject;
  level: Level;

  constructor() {
    super();
    this.keyTracker = new KeyTracker();

    this.camera = new Camera();
    this.inven = new Inventory();
    this.level = new Level();
    this.addChild(this.camera);
  }

  override ready() {
    eventEmitter.on("CHANGE_LEVEL", this, (level) => {
      this.setLevel(level);
    });
  }

  setLevel(level: Level) {
    if (this.level) this.level.destroy();
    this.level = level;
    this.addChild(this.level);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.level.background?.drawImage(ctx, 0, 0);
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.inven.drawEntry(ctx, this.inven.position.x, this.inven.position.y);
  }
}
