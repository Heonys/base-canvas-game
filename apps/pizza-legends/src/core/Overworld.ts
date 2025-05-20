import { GameObject, Config, resources, Sprite, Vector2d } from "@/core";

export class Overworld extends GameObject {
  constructor(config: Config) {
    super(config);
  }

  ready() {
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

    this.addChild(map);
    this.addChild(hero);
    this.addChild(shadow);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      child.draw(ctx, 0, 0);
    });
  }
}
