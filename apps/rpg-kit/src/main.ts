import { GameLoop } from "@/core";
import { MainScene } from "@/gameObjects";

import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const mainScene = new MainScene();

const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

const render = () => {
  mainScene.drawEntry(ctx, 0, 0);
};

const gameLoop = new GameLoop(update, render);
gameLoop.start();
