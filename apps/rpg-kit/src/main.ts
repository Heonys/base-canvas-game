import { resources } from "@/core/Resources";
import { Sprite } from "@/core/Sprite";
import { Vector2 } from "@/core/Vector2";

import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  frameCols: 3,
  frameRows: 8,
  currentFrame: 1,
});

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const heroPos = new Vector2(16 * 6, 16 * 5);
const heroOffset = new Vector2(-8, -19);

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  hero.drawImage(ctx, heroPos.x + heroOffset.x, heroPos.y + heroOffset.y);
  shadow.drawImage(ctx, heroPos.x + heroOffset.x, heroPos.y + heroOffset.y);
};

setInterval(() => {
  draw();
}, 300);
