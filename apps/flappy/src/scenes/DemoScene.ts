export class DemoScene extends Phaser.Scene {
  constructor() {
    super("demo");
  }

  preload() {
    this.load.image("sky", "/images/sky.png");
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, "sky");
  }
}
