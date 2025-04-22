import { resources, Sprite, Vector2, GameLoop, KeyTracker, Direction } from "@/core";
import { gridCells, moveTowards, isSpaceFree } from "@/utils";
import { walls } from "@/object";

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
  position: new Vector2(gridCells(6), gridCells(5)),
});

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const keyTracker = new KeyTracker();
const heroOffset = new Vector2(-8, -19);
const destination = hero.position.duplicate();

const update = () => {
  const distance = moveTowards(hero, destination, 1);
  const isArrived = distance <= 1;
  if (isArrived) handleMove();
};

const handleMove = () => {
  if (!keyTracker.direction) return;

  let nextX = destination.x;
  let nextY = destination.y;
  const gridSize = 16;

  switch (keyTracker.direction) {
    case Direction.DOWN: {
      nextY += gridSize;
      hero.currentFrame = 0;
      break;
    }
    case Direction.UP: {
      nextY -= gridSize;
      hero.currentFrame = 6;
      break;
    }
    case Direction.LEFT: {
      nextX -= gridSize;
      hero.currentFrame = 9;
      break;
    }
    case Direction.RIGHT: {
      nextX += gridSize;
      hero.currentFrame = 3;
      break;
    }
  }

  if (isSpaceFree(walls, nextX, nextY)) {
    destination.x = nextX;
    destination.y = nextY;
  }
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  const x = hero.position.x + heroOffset.x;
  const y = hero.position.y + heroOffset.y;

  hero.drawImage(ctx, x, y);
  shadow.drawImage(ctx, x, y);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
