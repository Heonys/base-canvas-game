import { BaseScene } from "@/scenes";

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;
  jumpSound!: Phaser.Sound.HTML5AudioSound;
  hitSound!: Phaser.Sound.HTML5AudioSound;

  constructor(
    public scene: BaseScene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, "dino-run");

    this.cursor = this.scene.input.keyboard!.createCursorKeys();
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.init();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update);
  }

  init() {
    this.setOrigin(0, 1)
      .setGravityY(5000)
      .setBodySize(44, 92)
      .setCollideWorldBounds(true)
      .setOffset(20, 0)
      .setDepth(1);

    this.jumpSound = this.scene.sound.add("jump", { volume: 0.5 }) as Phaser.Sound.HTML5AudioSound;
    this.hitSound = this.scene.sound.add("hit", { volume: 0.5 }) as Phaser.Sound.HTML5AudioSound;

    this.anims.create({
      key: "dino-run",
      frames: this.anims.generateFrameNumbers("dino-run", { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "dino-down",
      frames: this.anims.generateFrameNumbers("dino-down"),
      frameRate: 10,
      repeat: -1,
    });
  }

  runAnimation() {
    if (this.body!.height <= 58) {
      this.anims.play("dino-down", true);
    } else {
      this.anims.play("dino-run", true);
    }
  }

  update = () => {
    const { space, down } = this.cursor;
    const body = this.body as Phaser.Physics.Arcade.Body;

    const isOnFloor = body.onFloor();
    if (Phaser.Input.Keyboard.JustDown(space) && isOnFloor) {
      this.setVelocityY(-1600);
      this.jumpSound.play();
    }

    if (Phaser.Input.Keyboard.JustDown(down) && isOnFloor) {
      this.runAnimation();
      this.setBodySize(body.width, 58).setOffset(60, 34);
    }

    if (Phaser.Input.Keyboard.JustUp(down) && isOnFloor) {
      this.runAnimation();
      this.setBodySize(body.width, 92).setOffset(20, 0);
    }

    if (!this.scene.isPlaying) return;

    if (body.deltaAbsY() > 0) {
      this.anims.stop();
      this.setTexture("dino-run", 0);
    } else {
      this.runAnimation();
    }
  };

  die() {
    this.anims.pause();
    this.setTexture("dino-hurt");
    this.hitSound.play();
  }
}
