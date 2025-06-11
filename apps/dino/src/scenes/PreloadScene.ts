import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("ground", "/images/ground.png");
  }

  create() {
    this.scene.start("PlayScene");
  }
}
