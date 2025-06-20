import { Player } from "@/entities";
import { Weapon } from "@/attacks";
import { SpriteEffect } from "@/effects";

export class Melee extends Weapon {
  damage = 15;
  cooldown = 500;
  player?: Player;
  isCooldown = false;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
  ) {
    super(scene, x, y, key);
    this.setOrigin(0.5, 1).setDepth(10).activate(false);

    this.on("animationcomplete", (animation: Phaser.Animations.Animation) => {
      if (animation.key === "sword-swing") {
        this.activate(false);
        this.body!.checkCollision.none = false;
        this.body?.reset(0, 0);
      }
    });
  }

  cleanupHit(target: Phaser.Physics.Arcade.Sprite) {
    const impactPosition = new Phaser.Math.Vector2(this.x, this.y);
    const effect = new SpriteEffect(this.scene, 0, 0, "hit-effect", impactPosition);
    effect.playEffect(target);
    this.body!.checkCollision.none = true;
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.active || !this.player) return;

    if (this.player.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipX(false);
      this.body?.reset(this.player.x + 15, this.player.y);
    } else {
      this.setFlipX(true);
      this.body?.reset(this.player.x - 15, this.player.y);
    }
  }

  swing(player: Player) {
    if (this.isCooldown) return;

    this.player = player;
    this.activate(true);
    this.anims.play("sword-swing", true);

    this.isCooldown = true;
    this.scene.time.delayedCall(this.cooldown, () => {
      this.isCooldown = false;
    });
  }
}
