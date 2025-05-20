import { Overworld, GameLoop } from "@/core";

import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const overworld = new Overworld({});

const update = (delta: number) => {
  overworld.stepEntry(delta, overworld);
};

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  overworld.drawEntry(ctx, 0, 0);
};

const gameLoop = new GameLoop(update, render);
gameLoop.start();
