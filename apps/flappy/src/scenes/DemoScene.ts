const LIMIT_HEIGHT = 20;
const PIPE_TO_RENDER = 5;

export class DemoScene extends Phaser.Scene {
  bird!: Phaser.Physics.Arcade.Sprite;
  cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  pipes!: Phaser.Physics.Arcade.Group;

  horizontalDistance = 0;
  distanceRange: [number, number] = [150, 250];

  constructor() {
    super("demo");
  }

  preload() {
    this.load.image("sky", "/images/sky.png");
    this.load.image("bird", "/images/bird.png");
    this.load.image("pipe", "/images/pipe.png");
  }

  create() {
    this.cursor = this.input.keyboard.createCursorKeys();
    this.add.image(this.scale.width / 2, this.scale.height / 2, "sky");

    this.bird = this.physics.add.sprite(this.scale.width / 10, this.scale.height / 10, "bird");
    this.bird.setGravityY(400);
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPE_TO_RENDER; i++) {
      const top = this.pipes.create(0, 0, "pipe").setOrigin(0, 1).refreshBody();
      const bottom = this.pipes.create(0, 0, "pipe").setOrigin(0, 0).refreshBody();

      this.horizontalDistance += 400;
      this.createPipes(top, bottom, this.horizontalDistance);
    }
    this.pipes.setVelocityX(-200);

    // this.physics.add.collider(this.bird, this.pipes);
  }

  createPipes(top: Phaser.Physics.Arcade.Sprite, bottom: Phaser.Physics.Arcade.Sprite, x: number) {
    const distance = Phaser.Math.Between(...this.distanceRange);
    const y = Phaser.Math.Between(LIMIT_HEIGHT, this.scale.height - LIMIT_HEIGHT - distance);

    top.x = x;
    top.y = y;
    bottom.x = x;
    bottom.y = y + distance;
  }

  update(_time: number, _delta: number) {
    if (this.cursor.space?.isDown) {
      this.bird.setVelocityY(-200);
    }

    if (
      this.bird.y + this.bird.height / 2 > this.scale.height ||
      this.bird.y + this.bird.height / 2 < 0
    ) {
      this.bird.x = this.scale.width / 10;
      this.bird.y = this.scale.height / 10;
      this.bird.setVelocityY(0);
    }

    this.recyclePipes();
  }

  recyclePipes() {
    const temps: Phaser.Physics.Arcade.Sprite[] = [];

    this.pipes.children.each((child) => {
      const pipe = child as Phaser.Physics.Arcade.Sprite;

      if (pipe.getBounds().right <= 0) {
        temps.push(pipe);

        if (temps.length >= 2) {
          const [top, bottom] = temps;
          const maxX = Math.max(
            ...this.pipes.getChildren().map((p) => (p as Phaser.Physics.Arcade.Sprite).x),
          );
          this.createPipes(top, bottom, maxX + 400);
        }
      }
    });
  }
}
