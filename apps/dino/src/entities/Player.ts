import { BaseScene } from "@/scenes";

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;

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
    this.setOrigin(0, 1).setGravityY(5000).setBodySize(44, 92).setCollideWorldBounds(true);

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
    this.anims.play("dino-run", true);
  }

  update = () => {
    const { space, down } = this.cursor;
    const body = this.body as Phaser.Physics.Arcade.Body;

    const isOnFloor = body.onFloor();
    if (Phaser.Input.Keyboard.JustDown(space) && isOnFloor) {
      this.setVelocityY(-1600);
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
  }
}
