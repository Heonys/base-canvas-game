import { HealthBar } from "@/hud";
import { SHARED_CONFIG } from "@/main";
import { Enemy } from "@/entities";
import { Projectiles } from "@/groups";

export class Player extends Phaser.Physics.Arcade.Sprite {
  hp = 100;
  hpBar: HealthBar;
  speed = 200;
  gravity = 500;
  bounceVelocity = 250;
  jumpCount = 0;
  moreJumps = 1;
  hasBeenHit = false;

  facing = Phaser.Physics.Arcade.FACING_RIGHT;
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;
  projectiles: Projectiles;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, "player");
    this.cursor = this.scene.input.keyboard!.createCursorKeys();
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.projectiles = new Projectiles(this.scene);

    this.hpBar = new HealthBar(
      this.scene,
      this.hp,
      SHARED_CONFIG.cameraTopLeft.x + 5,
      SHARED_CONFIG.cameraTopLeft.y + 5,
    );

    this.init();
    this.createAnimation();
  }

  init() {
    this.setGravityY(this.gravity)
      .setDepth(1)
      .setCollideWorldBounds(true)
      .setOrigin(0.5, 1)
      .setBodySize(20, 36);
  }

  createAnimation() {
    this.scene.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "run",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 11, end: 15 }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "jump",
      frames: this.scene.anims.generateFrameNumbers("player", { start: 17, end: 23 }),
      frameRate: 2,
      repeat: 1,
    });

    this.scene.anims.create({
      key: "throw",
      frames: this.scene.anims.generateFrameNumbers("player-throw", { start: 0, end: 6 }),
      frameRate: 14,
      repeat: 0,
    });
  }

  handleHit(enemy: Enemy) {
    if (this.hasBeenHit) return;
    this.hasBeenHit = true;
    this.hp -= enemy.damage;
    this.hpBar.decrease(this.hp);

    if (this.body?.touching.right) {
      this.setVelocity(-this.bounceVelocity, -this.bounceVelocity);
    } else {
      this.setVelocity(this.bounceVelocity, -this.bounceVelocity);
    }

    const hitTween = this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: -1,
      alpha: 0,
      yoyo: true,
    });

    this.scene.time.delayedCall(1000, () => {
      this.hasBeenHit = false;
      hitTween.stop();
      this.setAlpha(1);
    });
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.hasBeenHit) return;

    const qKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    if (Phaser.Input.Keyboard.JustDown(qKey)) {
      this.projectiles.fire(this);
      this.anims.play("throw", true);
    }

    const { left, right, space } = this.cursor;
    const body = this.body as Phaser.Physics.Arcade.Body;
    const isOnFloor = body.onFloor();
    const jumpable = this.jumpCount < this.moreJumps;

    if (left.isDown) {
      this.facing = Phaser.Physics.Arcade.FACING_LEFT;
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.facing = Phaser.Physics.Arcade.FACING_RIGHT;
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(space) && (isOnFloor || jumpable)) {
      this.setVelocityY(-this.speed * 1.5);
      this.jumpCount++;
    }

    if (isOnFloor) {
      this.jumpCount = 0;
    }

    if (this.isPlayingAnims("throw")) return;

    if (isOnFloor) {
      if (body.velocity.x === 0) {
        this.anims.play("idle", true);
      } else {
        this.anims.play("run", true);
      }
    } else {
      this.anims.play("jump", true);
    }
  }

  isPlayingAnims(key: string) {
    return this.anims.isPlaying && this.anims.currentAnim?.key === key;
  }
}
