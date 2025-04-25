import { eventEmitter, GameObject, resources, Sprite, Vector2 } from "@/core";

export class Rod extends GameObject {
  body: Sprite;
  constructor(x: number, y: number) {
    super(new Vector2(x, y));

    this.body = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0, -5),
    });
    this.addChild(this.body);
  }

  override ready() {
    eventEmitter.on("HERO_POSITION", this, (position) => {
      const heroX = Math.round(position.x);
      const heroY = Math.round(position.y);

      if (this.position.x === heroX && this.position.y === heroY) {
        this.onCollide();
      }
    });
  }

  onCollide() {
    this.destroy();

    eventEmitter.emit("HERO_PICKS_UP_ITEM", {
      image: resources.images.rod,
      position: this.position,
    });
  }
}
