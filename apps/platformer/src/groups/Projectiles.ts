import { Projectile } from "@/attacks";
import { Enemy, Player } from "@/entities";

export class Projectiles extends Phaser.Physics.Arcade.Group {
  isCooldown = false;
  delay?: number;

  constructor(scene: Phaser.Scene, key: string, delay?: number) {
    super(scene.physics.world, scene);
    this.delay = delay;

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key,
      classType: Projectile,
    });
  }

  fire(initiator: Player | Enemy, anim?: string) {
    if (this.isCooldown) return;

    const center = initiator.getCenter();
    const projectile = this.getFirstDead(false) as Projectile;
    if (!projectile) return;

    if (initiator.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.speed = Math.abs(projectile.speed);
      projectile.setFlipX(false);
    } else {
      projectile.speed = -Math.abs(projectile.speed);
      projectile.setFlipX(true);
    }

    projectile.fire(center.x, center.y, anim);
    this.isCooldown = true;

    this.scene.time.delayedCall(this.delay ?? projectile.cooldown, () => {
      this.isCooldown = false;
    });
  }
}
