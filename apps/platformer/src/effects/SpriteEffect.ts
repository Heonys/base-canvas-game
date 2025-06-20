export class SpriteEffect extends Phaser.Physics.Arcade.Sprite {
  target?: Phaser.Physics.Arcade.Sprite;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    public effectName: string,
    public impactPosition: Phaser.Math.Vector2,
  ) {
    super(scene, x, y, "");

    this.effectName = effectName;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.on("animationcomplete", (animation: Phaser.Animations.Animation) => {
      if (animation.key === this.effectName) {
        this.destroy();
      }
    });
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.placeEffect();
  }

  placeEffect() {
    if (!this.target) return;
    const center = this.target.getCenter();
    this.body?.reset(center.x, this.impactPosition.y);
  }

  playEffect(target: Phaser.Physics.Arcade.Sprite) {
    this.target = target;
    this.anims.play(this.effectName, true);
    this.placeEffect();
  }
}
