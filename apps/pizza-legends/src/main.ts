import { GameLoop } from "@/core";
import { Overworld } from "@/gameObject";
// import { DemoMap } from "@/maps";
// import { Direction } from "@/constants";
import { BattleField } from "@/combat";

import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const overworld = new Overworld();
// overworld.chageMap(new DemoMap());
overworld.chageMap(new BattleField());

const update = (delta: number) => {
  overworld.stepEntry(delta, overworld);
  overworld.keyTracker.update();
};

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  overworld.drawBackground(ctx);
  ctx.save();
  ctx.translate(overworld.camera.position.x, overworld.camera.position.y);
  overworld.drawObject(ctx);
  ctx.restore();

  overworld.drawForeground(ctx);
};

const gameLoop = new GameLoop(update, render);
gameLoop.start();

// overworld.startCutscene([
//   { id: "npc1", type: "walk", dir: Direction.UP, destination: [8, 8] },
//   { id: "npc1", type: "walk", dir: Direction.LEFT, destination: [6, 8] },
//   { id: "npc1", type: "stand", dir: Direction.LEFT, duration: 100 },
//   // { id: "root", type: "textbox", message: "test message" },
//   // { id: "npc1", type: "walk", dir: Direction.LEFT, destination: [2, 8] },
// ]);
