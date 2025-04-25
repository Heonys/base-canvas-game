import { eventEmitter, GameObject, resources, Sprite, Vector2 } from "@/core";

export class Exit extends GameObject {
  constructor(x: number, y: number) {
    super(new Vector2(x, y));

    this.addChild(
      new Sprite({
        resource: resources.images.exit,
      }),
    );
  }

  override ready() {
    eventEmitter.on("HERO_POSITION", this, (position) => {
      const heroX = Math.round(position.x);
      const heroY = Math.round(position.y);
      if (this.position.x === heroX && this.position.y === heroY) {
        eventEmitter.emit("HERO_EXIT");
      }
    });
  }
}
