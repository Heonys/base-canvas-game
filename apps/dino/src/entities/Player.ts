export class Player extends Phaser.Physics.Arcade.Sprite {
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, "dino-idle");

    this.cursor = this.scene.input.keyboard!.createCursorKeys();
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.init();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update);

    this.anims.create({
      key: "dino-run",
      frames: this.anims.generateFrameNumbers("dino-run", { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  init() {
    this.setOrigin(0, 1).setGravityY(5000).setBodySize(44, 92).setCollideWorldBounds(true);
  }

  runAnimation() {
    this.anims.play("dino-run", true);
  }

  update = () => {
    const space = this.cursor.space;
    const isOnFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor();

    if (Phaser.Input.Keyboard.JustDown(space) && isOnFloor) {
      this.setVelocityY(-1600);
    }
  };
}
