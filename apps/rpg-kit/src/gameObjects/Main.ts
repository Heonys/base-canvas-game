import { Camera, eventEmitter, GameObject, KeyTracker, Level } from "@/core";
import { Inventory, SpriteText } from "@/gameObjects";

export class Main extends GameObject {
  keyTracker: KeyTracker;
  camera: Camera;
  level: Level;

  constructor() {
    super();
    this.keyTracker = new KeyTracker();

    this.camera = new Camera();
    this.level = new Level();

    this.addChild(this.camera);

    eventEmitter.on("HERO_REQUEST_ACTION", this, (neighborObject) => {
      if (neighborObject.getContents) {
        const { text, portraitFrame } = neighborObject.getContents();
        const textbox = new SpriteText(text, portraitFrame);
        this.addChild(textbox);

        eventEmitter.emit("START_TEXT_BOX");
        const handlerId = eventEmitter.on("END_TEXT_BOX", this, () => {
          textbox.destroy();
          eventEmitter.off(handlerId);
        });
      }
    });
  }

  override ready() {
    this.addChild(new Inventory());

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

  drawObjects(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer !== "HUD") {
        child.drawEntry(ctx, 0, 0);
      }
    });
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer === "HUD") {
        child.drawEntry(ctx, 0, 0);
      }
    });
  }
}
