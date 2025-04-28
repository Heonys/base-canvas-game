import { GameObject, Sprite, Vector2, resources } from "@/core";

export class Knight extends GameObject {
  textContent: string;

  constructor(x: number, y: number, textContent: string) {
    super(new Vector2(x, y));

    this.isSolid = true;
    this.textContent = textContent;

    this.addChild(
      new Sprite({
        resource: resources.images.shadow,
        frameSize: new Vector2(32, 32),
        position: new Vector2(-8, -19),
      }),
    );

    this.addChild(
      new Sprite({
        resource: resources.images.knight,
        frameSize: new Vector2(32, 32),
        position: new Vector2(-8, -20),
        frameCols: 2,
      }),
    );
  }

  getContents = () => {
    return {
      portraitFrame: 1,
      text: this.textContent,
    };
  };
}
