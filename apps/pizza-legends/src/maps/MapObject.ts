import { Layer } from "@/constants";
import { GameObject, Vector2d } from "@/core";
import { Sprite } from "@/gameObject";

export class MapObject extends GameObject {
  startPosition: Vector2d = new Vector2d(0, 0);
  background?: Sprite;
  walls: any;

  constructor() {
    super();
    this.layer = Layer.Lower;
  }
}
