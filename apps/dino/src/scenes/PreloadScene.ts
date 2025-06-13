import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("ground", "/images/ground.png");
    this.load.image("dino-idle", "/images/dino-idle.png");
    this.load.spritesheet("dino-run", "/images/dino-run.png", {
      frameWidth: 352 / 4,
      frameHeight: 94,
    });
  }

  create() {
    this.scene.start("play");
  }
}
