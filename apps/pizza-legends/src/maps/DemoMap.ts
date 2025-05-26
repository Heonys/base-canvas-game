import { GameObject, resources, Vector2d } from "@/core";
import { Layer } from "@/constants";
import { Sprite } from "@/gameObject";

export class DemoMap extends GameObject {
  constructor() {
    super();
    this.layer = Layer.Lower;
  }

  ready() {
    this.addChild(
      new Sprite({
        src: resources.images.map,
        frameSize: new Vector2d(352, 198),
      }),
    );
  }
}
