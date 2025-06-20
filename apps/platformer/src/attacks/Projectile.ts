import { SpriteEffect } from "@/effects";

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  speed = 300;
  maxDistance = 200;
  currnetDistance = 0;
  cooldown = 1000;
  damage = 10;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
  ) {
    super(scene, x, y, key);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setBodySize(this.width - 13, this.height - 20);
  }

  fire(x: number, y: number) {
    this.activate(true);
    this.body?.reset(x, y);
    this.setVelocityX(this.speed);
  }

  activate(isActive: boolean) {
    this.setActive(isActive).setVisible(isActive);
  }

  cleanupHit(target: Phaser.Physics.Arcade.Sprite) {
    this.activate(false);
    this.currnetDistance = 0;

    const impactPosition = new Phaser.Math.Vector2(this.x, this.y);
    this.body?.reset(0, 0);

    const effect = new SpriteEffect(this.scene, 0, 0, "hit-effect", impactPosition);
    effect.playEffect(target);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    this.currnetDistance += this.body!.deltaAbsX();

    if (this.currnetDistance >= this.maxDistance) {
      this.activate(false);
      this.currnetDistance = 0;
      this.body?.reset(0, 0);
    }
  }
}
