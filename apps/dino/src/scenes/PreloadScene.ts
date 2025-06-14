import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("restart", "/images/restart.png");
    this.load.image("game-over", "/images/game-over.png");

    this.load.image("ground", "/images/ground.png");

    this.load.image("obstacle-1", "/images/cactuses_1.png");
    this.load.image("obstacle-2", "/images/cactuses_2.png");
    this.load.image("obstacle-3", "/images/cactuses_3.png");
    this.load.image("obstacle-4", "/images/cactuses_4.png");
    this.load.image("obstacle-5", "/images/cactuses_5.png");
    this.load.image("obstacle-6", "/images/cactuses_6.png");

    this.load.image("dino-hurt", "/images/dino-hurt.png");
    this.load.spritesheet("dino-run", "/images/dino-run.png", {
      frameWidth: 352 / 4,
      frameHeight: 94,
    });
    this.load.spritesheet("dino-down", "/images/dino-down-2.png", {
      frameWidth: 236 / 2,
      frameHeight: 94,
    });
  }

  create() {
    this.scene.start("play");
  }
}
