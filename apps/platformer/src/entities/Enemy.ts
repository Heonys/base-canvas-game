export class Enemy extends Phaser.Physics.Arcade.Sprite {
  speed = 150;
  gravity = 500;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
  ) {
    super(scene, x, y, key);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setGravityY(this.gravity)
      .setCollideWorldBounds(true)
      .setOrigin(0.5, 1)
      .setImmovable(true)
      .setBodySize(20, 45)
      .setOffset(10, 20);
  }

  override preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.setVelocityX(30);
  }
}
