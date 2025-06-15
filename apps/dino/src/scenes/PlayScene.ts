import Phaser from "phaser";
import { Player } from "@/entities";
import { BaseScene } from "@/scenes";

export class PlayScene extends BaseScene {
  ground!: Phaser.GameObjects.TileSprite;
  player!: Player;
  trigger!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  obstacles!: Phaser.Physics.Arcade.Group;
  clouds!: Phaser.GameObjects.Group;

  reachSound!: Phaser.Sound.HTML5AudioSound;

  scoreText!: Phaser.GameObjects.Text;
  gameOverContainer!: Phaser.GameObjects.Container;
  gameOverImage!: Phaser.GameObjects.Image;
  restartImage!: Phaser.GameObjects.Image;

  score = 0;
  scoreTime = 0;
  scoreInterval = 100;

  spawnInterval = 1500;
  spawnTime = 0;

  gameSpeed = 13;
  gameSpeedModifier = 1;

  constructor() {
    super("play");
  }

  create() {
    this.ground = this.add.tileSprite(0, this.scale.height, 88, 26, "ground").setOrigin(0, 1);
    this.clouds = this.add
      .group()
      .addMultiple([
        this.add.image(this.scale.width / 2, 170, "cloud"),
        this.add.image(this.scale.width - 80, 80, "cloud"),
        this.add.image(this.scale.width / 1.3, 100, "cloud"),
      ])
      .setVisible(false);

    this.player = new Player(this, 0, this.scale.height);
    this.obstacles = this.physics.add.group();
    this.ceateGameoverContainer();
    this.createScore();

    this.reachSound = this.sound.add("reach", { volume: 0.2 }) as Phaser.Sound.HTML5AudioSound;

    this.anims.create({
      key: "bird-fly",
      frames: this.anims.generateFrameNumbers("obstacle-7"),
      frameRate: 6,
      repeat: -1,
    });

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

    this.scoreTime += delta;
    if (this.scoreTime >= this.scoreInterval) {
      this.score++;
      this.scoreText.setText(`${this.score}`.padStart(5, "0"));
      this.scoreTime = 0;

      if (this.score % 100 === 0) {
        this.gameSpeedModifier += 0.1;
        this.reachSound.play();
        this.tweens.add({
          targets: this.scoreText,
          duration: 100,
          repeat: 3,
          alpha: 0,
          yoyo: true,
        });
      }
    }

    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed * this.gameSpeedModifier);
    Phaser.Actions.IncX(this.clouds.getChildren(), -0.5);
    this.ground.tilePositionX += this.gameSpeed * this.gameSpeedModifier;

    this.obstacles.getChildren().forEach((it) => {
      const obstacle = it as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
      if (obstacle.getBounds().right < 0) {
        this.obstacles.remove(obstacle);
      }
    });

    this.clouds.getChildren().forEach((it) => {
      const cloud = it as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
      if (cloud.getBounds().right < 0) {
        cloud.x = this.scale.width + 30;
      }
    });
  }

  spawnObstacle() {
    let obstacle: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    const index = Math.floor(Math.random() * 7) + 1;
    const distance = this.scale.width + Phaser.Math.Between(150, 300);

    if (index > 6) {
      obstacle = this.obstacles.create(
        distance,
        this.scale.height - Phaser.Math.RND.pick([20, 70]),
        `obstacle-${index}`,
      );
      obstacle.play("bird-fly");
    } else {
      obstacle = this.obstacles.create(distance, this.scale.height, `obstacle-${index}`);
    }

    obstacle.setOrigin(0, 1).setImmovable(true);
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
            this.clouds.setVisible(true);
            this.scoreText.setVisible(true);
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
      this.anims.pauseAll();
      this.player.die();
      this.gameOverContainer.setVisible(true);

      this.gameSpeedModifier = 1;
      this.spawnTime = 0;
      this.scoreTime = 0;
      this.score = 0;
    });
  }

  createScore() {
    this.scoreText = this.add
      .text(this.scale.width, 0, "00000", {
        color: "#535353",
        fontSize: 30,
        fontFamily: "Arial",
      })
      .setOrigin(1, 0)
      .setVisible(false);
  }
}
