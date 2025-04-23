import {
  resources,
  Sprite,
  Vector2,
  GameLoop,
  KeyTracker,
  Direction,
  Animations,
  FrameManager,
} from "@/core";
import { gridCells, moveTowards, isSpaceFree } from "@/utils";
import { walls } from "@/object";

import "./style.css";
import {
  WALK_DOWN,
  WALK_UP,
  WALK_LEFT,
  WALK_RIGHT,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
} from "./animation/hero";

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
  animations: new Animations({
    walkDown: new FrameManager(WALK_DOWN),
    walkUp: new FrameManager(WALK_UP),
    walkLeft: new FrameManager(WALK_LEFT),
    walkRight: new FrameManager(WALK_RIGHT),
    standDown: new FrameManager(STAND_DOWN),
    standUp: new FrameManager(STAND_UP),
    standLeft: new FrameManager(STAND_LEFT),
    standRight: new FrameManager(STAND_RIGHT),
  }),
});

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const keyTracker = new KeyTracker();
const heroOffset = new Vector2(-8, -19);
const destination = hero.position.duplicate();
let heroFacing: Direction = Direction.DOWN;

const update = (delta: number) => {
  const distance = moveTowards(hero, destination, 1);
  const isArrived = distance <= 1;
  if (isArrived) handleMove();

  hero.step(delta);
};

const handleMove = () => {
  if (!keyTracker.direction) {
    if (heroFacing === Direction.DOWN) hero.animations?.play("standDown");
    if (heroFacing === Direction.UP) hero.animations?.play("standUp");
    if (heroFacing === Direction.LEFT) hero.animations?.play("standLeft");
    if (heroFacing === Direction.RIGHT) hero.animations?.play("standRight");
    return;
  }

  let nextX = destination.x;
  let nextY = destination.y;
  const gridSize = 16;

  switch (keyTracker.direction) {
    case Direction.DOWN: {
      nextY += gridSize;
      hero.animations?.play("walkDown");
      break;
    }
    case Direction.UP: {
      nextY -= gridSize;
      hero.animations?.play("walkUp");
      break;
    }
    case Direction.LEFT: {
      nextX -= gridSize;
      hero.animations?.play("walkLeft");
      break;
    }
    case Direction.RIGHT: {
      nextX += gridSize;
      hero.animations?.play("walkRight");
      break;
    }
  }

  heroFacing = keyTracker.direction ?? heroFacing;

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
