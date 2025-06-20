import { Weapon } from "@/attacks";
import { Enemy } from "@/entities";

export class Birdman extends Enemy {
  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, "birdman");
  }

  init() {
    super.init();
    this.setBodySize(20, 45).setOffset(10, 20);
  }

  override preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.active) return;
    if (this.isPlayingAnims("birdman-hurt")) return;
    this.anims.play("birdman-idle", true);
  }

  onHit(source: Weapon) {
    super.onHit(source);
    this.anims.play("birdman-hurt", true);
  }
}
