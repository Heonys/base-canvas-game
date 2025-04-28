import { GameLoop } from "@/core";
import { Main } from "@/gameObjects";
import { Cave } from "@/level";

import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const mainScene = new Main();
mainScene.setLevel(new Cave());

const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
  mainScene.keyTracker.update();
};

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mainScene.drawBackground(ctx);

  ctx.save();
  ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
  mainScene.drawObjects(ctx);
  ctx.restore();

  mainScene.drawForeground(ctx);
};

const gameLoop = new GameLoop(update, render);
gameLoop.start();
