import { SpriteEffect } from "@/effects";
import { Weapon } from "@/attacks";

export class Projectile extends Weapon {
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
    this.setBodySize(this.width - 13, this.height - 20);
  }

  fire(x: number, y: number, anim?: string) {
    this.activate(true);
    this.body?.reset(x, y);
    this.setVelocityX(this.speed);

    if (anim) this.anims.play(anim, true);
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
