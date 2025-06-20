import { Weapon } from "@/attacks";
import { Enemy } from "@/entities";

export class Snaky extends Enemy {
  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, "snaky");
  }

  init() {
    super.init();
    this.setBodySize(12, 45).setOffset(10, 15);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.active) return;
    if (this.isPlayingAnims("sanky-hurt")) return;
    this.anims.play("snaky-idle", true);
  }

  onHit(source: Weapon) {
    super.onHit(source);
    this.anims.play("snaky-hurt", true);
  }
}
