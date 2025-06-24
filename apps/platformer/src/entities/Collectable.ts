export class Collectable extends Phaser.Physics.Arcade.Sprite {
  score = 1;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
  ) {
    super(scene, x, y, texture);

    this.scene.add.existing(this);

    this.setOrigin(0, 1);

    this.scene.tweens.add({
      targets: this,
      y: this.y - 3,
      duration: Phaser.Math.Between(1500, 2500),
      ease: "linear",
      repeat: -1,
      yoyo: true,
    });
  }
}
