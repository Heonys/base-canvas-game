import { HealthBar } from "@/hud";
import { SHARED_CONFIG } from "@/main";
import { Enemy } from "@/entities";
import { Projectiles } from "@/groups";
import { Melee, Weapon } from "@/attacks";
import { eventEmitter } from "@/core";

export class Player extends Phaser.Physics.Arcade.Sprite {
  hp = 20;
  hpBar: HealthBar;
  speed = 200;
  gravity = 500;
  bounceVelocity = 250;
  jumpCount = 0;
  moreJumps = 1;
  hasBeenHit = false;
  isSliding = false;

  facing = Phaser.Physics.Arcade.FACING_RIGHT;
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;
  projectiles: Projectiles;
  melee: Melee;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    public restart?: boolean,
  ) {
    super(scene, x, y, "player");
    this.cursor = this.scene.input.keyboard!.createCursorKeys();
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.projectiles = new Projectiles(this.scene, "iceball-1");
    this.melee = new Melee(this.scene, 0, 0, "shword-attack");

    this.hpBar = new HealthBar(
      this.scene,
      this.hp,
      SHARED_CONFIG.cameraTopLeft.x + 5,
      SHARED_CONFIG.cameraTopLeft.y + 5,
    );

    this.init();
    if (!restart) {
      this.createAnimation();
    }
    this.handleSlide();
  }

  init() {
    this.setGravityY(this.gravity)
      .setDepth(1)
      .setCollideWorldBounds(true)
      .setOrigin(0.5, 1)
      .setBodySize(20, 36);
  }

  onHit(source: Enemy | Weapon) {
    if (this.hasBeenHit) return;
    this.hp -= source.damage ?? (source as any).properties.damage;

    if (this.hp <= 0) {
      this.gameOver();
      return;
    }

    this.hasBeenHit = true;
    this.hpBar.decrease(this.hp);

    if (source.body) {
      if (this.body?.touching.right) {
        this.setVelocity(-this.bounceVelocity, -this.bounceVelocity);
      } else {
        this.setVelocity(this.bounceVelocity, -this.bounceVelocity);
      }
    } else {
      if (this.body?.blocked.right) {
        this.setVelocity(-this.bounceVelocity, -this.bounceVelocity);
      } else {
        this.setVelocity(this.bounceVelocity, -this.bounceVelocity);
      }
    }

    source.cleanupHit?.(this);

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

  gameOver() {
    eventEmitter.emit("PLAYER_LOOSE");
  }

  handleSlide() {
    this.scene.input.keyboard?.on("keydown-DOWN", () => {
      console.log("down");

      this.setBodySize(this.body!.width, this.height / 2);
      this.setOffset(6, this.height / 2);
      this.setVelocityX(0);
      this.anims.play("slide", true);
      this.isSliding = true;
    });
    this.scene.input.keyboard?.on("keyup-DOWN", () => {
      this.setBodySize(20, 36);
      this.setOffset(6, 1);
      this.isSliding = false;
    });
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.hasBeenHit || this.isSliding) return;

    if (this.getBounds().top > this.scene.scale.height) {
      this.gameOver();
    }

    const qKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    const eKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    if (Phaser.Input.Keyboard.JustDown(qKey)) {
      this.projectiles.fire(this, "iceball");
      this.anims.play("throw", true);
    }

    if (Phaser.Input.Keyboard.JustDown(eKey)) {
      this.melee.swing(this);
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

    if (this.isPlayingAnims("throw") || this.isPlayingAnims("slide")) return;

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
      key: "slide",
      frames: this.scene.anims.generateFrameNumbers("player-slide", { start: 0, end: 2 }),
      frameRate: 20,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "throw",
      frames: this.scene.anims.generateFrameNumbers("player-throw", { start: 0, end: 6 }),
      frameRate: 14,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "sword-swing",
      frames: this.scene.anims.generateFrameNumbers("shword-attack", { start: 0, end: 2 }),
      frameRate: 20,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "iceball",
      frames: [{ key: "iceball-1" }, { key: "iceball-2" }],
      frameRate: 5,
      repeat: -1,
    });
  }

  addCollider(
    object: Phaser.Types.Physics.Arcade.ArcadeColliderType,
    callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
  ) {
    this.scene.physics.add.collider(this, object, callback);
    return this;
  }

  addOverlap(
    object: Phaser.Types.Physics.Arcade.ArcadeColliderType,
    callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
  ) {
    this.scene.physics.add.overlap(this, object, callback);
    return this;
  }
}
