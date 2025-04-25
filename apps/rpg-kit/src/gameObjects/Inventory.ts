import { eventEmitter, GameObject, ImageState, Sprite, Vector2 } from "@/core";

export class Inventory extends GameObject {
  nextId = 0;
  items: { id: number; image: ImageState }[] = [];

  constructor() {
    super(new Vector2(0, 1));
    this.updateInventory();

    eventEmitter.on("HERO_PICKS_UP_ITEM", this, ({ image }) => {
      this.nextId += 1;
      this.items.push({ id: this.nextId, image });
      this.updateInventory();
    });
  }

  updateInventory() {
    this.children.forEach((it) => it.destroy());

    this.items.forEach((item, index) => {
      this.addChild(
        new Sprite({
          resource: item.image,
          position: new Vector2(index * 12, 0),
        }),
      );
    });
  }

  removeItem(id: number) {
    this.items = this.items.filter((it) => it.id !== id);
    this.updateInventory();
  }
}
