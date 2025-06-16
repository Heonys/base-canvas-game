import { Enemy } from "@/entities";

export class Birdman extends Enemy {
  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, "birdman");
    this.createAnimation();
  }

  createAnimation() {
    this.scene.anims.create({
      key: "birdman-idle",
      frames: this.scene.anims.generateFrameNumbers("birdman", { start: 0, end: 12 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  override preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.anims.play("birdman-idle", true);
  }
}
