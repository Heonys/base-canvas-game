import Phaser from "phaser";
import { Player } from "@/entities";

export class PlayScene extends Phaser.Scene {
  ground!: Phaser.GameObjects.TileSprite;
  player!: Player;
  trigger!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super("play");
  }

  create() {
    this.ground = this.add.tileSprite(0, this.scale.height, 88, 26, "ground").setOrigin(0, 1);
    this.trigger = this.physics.add.sprite(0, 10, "").setAlpha(0).setOrigin(0, 1);

    this.player = new Player(this, 0, this.scale.height);

    this.physics.add.overlap(this.player, this.trigger, () => {
      if (this.trigger.y === 10) {
        this.trigger.body.reset(0, this.scale.height);
        return;
      }

      const rollOut = this.time.addEvent({
        delay: 1000 / 60,
        loop: true,
        callback: () => {
          this.player.runAnimation();
          this.ground.width += 17;
          this.player.setVelocityX(80);

          if (this.ground.width >= this.scale.width) {
            this.ground.width = this.scale.width;
            rollOut.remove();
            this.player.setVelocityX(0);
          }
        },
      });
      this.trigger.destroy();
    });
  }
}
