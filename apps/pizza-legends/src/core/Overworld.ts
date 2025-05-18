import { resources, Sprite, Vector2d } from "@/core";

export class Overworld {
  constructor() {
    this.init();
  }

  init() {}

  draw(ctx: CanvasRenderingContext2D) {
    const map = new Sprite({
      src: resources.images.map,
      frameSize: new Vector2d(352, 198),
    });

    const hero = new Sprite({
      src: resources.images.hero,
      frameSize: new Vector2d(32, 32),
      position: new Vector2d(5, 6),
      offset: new Vector2d(-8, -18),
    });
    const shadow = new Sprite({
      src: resources.images.shadow,
      frameSize: new Vector2d(32, 32),
      position: new Vector2d(5, 6),
      offset: new Vector2d(-8, -18),
    });

    setTimeout(() => {
      map.draw(ctx);
      shadow.draw(ctx);
      hero.draw(ctx);
    }, 1000);
  }
}
