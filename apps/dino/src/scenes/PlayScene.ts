import Phaser from "phaser";

export class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    this.physics.add.image(0, 0, "ground").setOrigin(0);
  }
}
