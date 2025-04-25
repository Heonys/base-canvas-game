import { Camera, GameLoop } from "@/core";
import { MainScene } from "@/gameObjects";

import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const mainScene = new MainScene();
const camera = new Camera();
mainScene.addChild(camera);

const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mainScene.drawFixed(ctx);

  ctx.save();
  ctx.translate(camera.position.x, camera.position.y);
  mainScene.drawEntry(ctx, 0, 0);
  ctx.restore();
};

const gameLoop = new GameLoop(update, render);
gameLoop.start();
