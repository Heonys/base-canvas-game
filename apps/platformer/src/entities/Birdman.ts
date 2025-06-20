import { Projectile } from "@/attacks";
import { Enemy } from "@/entities";

export class Birdman extends Enemy {
  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, "birdman");
  }
  override preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.active) return;
    if (this.isPlayingAnims("birdman-hurt")) return;
    this.anims.play("birdman-idle", true);
  }

  onHit(source: Projectile) {
    super.onHit(source);
    this.anims.play("birdman-hurt", true);
  }
}
