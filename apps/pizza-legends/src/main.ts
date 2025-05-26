import { GameLoop } from "@/core";
import { Overworld } from "@/gameObject";

import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const overworld = new Overworld();

const update = (delta: number) => {
  overworld.stepEntry(delta, overworld);
  overworld.keyTracker.update();
};

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  overworld.drawBackground(ctx);

  overworld.drawObject(ctx);

  overworld.drawForeground(ctx);
};

const gameLoop = new GameLoop(update, render);
gameLoop.start();
