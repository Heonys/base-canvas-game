import { Weapon } from "@/attacks";
import { Enemy } from "@/entities";
import { Projectiles } from "@/groups";

export class Snaky extends Enemy {
  projectiles: Projectiles;
  attackDelay = 2000;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, "snaky");
    this.projectiles = new Projectiles(this.scene, "fireball-1", this.attackDelay);
  }

  init() {
    super.init();
    this.setBodySize(12, 45).setOffset(10, 15);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    this.projectiles.fire(this, "fireball");

    if (!this.active) return;
    if (this.isPlayingAnims("sanky-hurt")) return;
    this.anims.play("snaky-idle", true);
  }

  onHit(source: Weapon) {
    super.onHit(source);
    this.anims.play("snaky-hurt", true);
  }
}
