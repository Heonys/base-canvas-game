export class Player extends Phaser.Physics.Arcade.Sprite {
  speed = 200;
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpCount = 0;
  moreJumps = 1;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, "player");
    this.cursor = this.scene.input.keyboard!.createCursorKeys();
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.init();
    this.createAnimation();
  }

  init() {
    this.setDepth(1);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setGravityY(500);
    this.setCollideWorldBounds(true);
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
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    const { left, right, space } = this.cursor;
    const body = this.body as Phaser.Physics.Arcade.Body;
    const isOnFloor = body.onFloor();
    const jumpable = this.jumpCount < this.moreJumps;

    if (left.isDown) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (right.isDown) {
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
}
