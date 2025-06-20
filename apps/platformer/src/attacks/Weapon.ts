export abstract class Weapon extends Phaser.Physics.Arcade.Sprite {
  abstract damage: number;
  abstract cooldown: number;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
  ) {
    super(scene, x, y, key);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  activate(isActive: boolean) {
    this.setActive(isActive).setVisible(isActive);
  }

  abstract cleanupHit(target: Phaser.Physics.Arcade.Sprite): void;
}
