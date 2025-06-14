import Phaser from "phaser";
import { Player } from "@/entities";
import { BaseScene } from "@/scenes";

export class PlayScene extends BaseScene {
  ground!: Phaser.GameObjects.TileSprite;
  player!: Player;
  trigger!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  obstacles!: Phaser.Physics.Arcade.Group;

  gameOverContainer!: Phaser.GameObjects.Container;
  gameOverImage!: Phaser.GameObjects.Image;
  restartImage!: Phaser.GameObjects.Image;

  gameSpeed = 10;
  spawnInterval = 1500;
  spawnTime = 0;

  constructor() {
    super("play");
  }

  create() {
    this.ground = this.add.tileSprite(0, this.scale.height, 88, 26, "ground").setOrigin(0, 1);
    this.player = new Player(this, 0, this.scale.height);
    this.obstacles = this.physics.add.group();
    this.ceateGameoverContainer();

    this.handleGameStart();
    this.handleGameRestart();
    this.handleCollistions();
  }
  update(_time: number, delta: number) {
    if (!this.isPlaying) return;

    this.spawnTime += delta;
    if (this.spawnTime >= this.spawnInterval) {
      this.spawnObstacle();
      this.spawnTime = 0;
    }

    this.obstacles.getChildren().forEach((it) => {
      const obstacle = it as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
      if (obstacle.getBounds().right < 0) {
        this.obstacles.remove(obstacle);
      }
    });

    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);
    this.ground.tilePositionX += this.gameSpeed;
  }

  spawnObstacle() {
    const index = Math.floor(Math.random() * 6) + 1;
    const distance = Phaser.Math.Between(600, 900);

    this.obstacles
      .create(distance, this.scale.height, `obstacle-${index}`)
      .setImmovable(true)
      .setOrigin(0, 1);
  }

  ceateGameoverContainer() {
    this.gameOverImage = this.add.image(0, 0, "game-over");
    this.restartImage = this.add.image(0, 80, "restart").setInteractive();

    this.gameOverContainer = this.add
      .container(this.scale.width / 2, this.scale.height / 2 - 50, [
        this.gameOverImage,
        this.restartImage,
      ])
      .setVisible(false);
  }

  handleGameStart() {
    this.trigger = this.physics.add.sprite(0, 10, "").setAlpha(0).setOrigin(0, 1);

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
            this.player.setVelocityX(0);
            rollOut.remove();
            this.isPlaying = true;
          }
        },
      });
      this.trigger.destroy();
    });
  }

  handleGameRestart() {
    this.restartImage.on("pointerdown", () => {
      this.physics.resume();
      this.isPlaying = true;
      this.player.setVelocityY(0);
      this.obstacles.clear(true, true);
      this.gameOverContainer.setVisible(false);
      this.anims.resumeAll();
      this.isPlaying = true;
    });
  }

  handleCollistions() {
    this.physics.add.collider(this.player, this.obstacles, () => {
      this.isPlaying = false;
      this.physics.pause();
      this.player.die();
      this.gameOverContainer.setVisible(true);

      this.gameSpeed = 10;
    });
  }
}
