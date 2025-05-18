import { Overworld, GameLoop } from "@/core";

import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const overworld = new Overworld();

const update = (delta: number) => {};

const render = () => {};

const gameLoop = new GameLoop(update, render);
gameLoop.start();
