import { Projectile } from "@/attacks";
import { Player } from "@/entities";

export class Projectiles extends Phaser.Physics.Arcade.Group {
  isCooldown = false;

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: "iceball",
      classType: Projectile,
    });
  }

  fire(player: Player) {
    if (this.isCooldown) return;

    const center = player.getCenter();
    const projectile = this.getFirstDead(false) as Projectile;
    if (!projectile) return;

    if (player.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.speed = Math.abs(projectile.speed);
      projectile.setFlipX(false);
    } else {
      projectile.speed = -Math.abs(projectile.speed);
      projectile.setFlipX(true);
    }

    projectile.fire(center.x, center.y);
    this.isCooldown = true;

    this.scene.time.delayedCall(projectile.cooldown, () => {
      this.isCooldown = false;
    });
  }
}
