export class Enemy extends Phaser.Physics.Arcade.Sprite {
  speed = 50;
  gravity = 500;
  steepnes = 0.2;

  graphics: Phaser.GameObjects.Graphics;
  colliderLayer?: Phaser.Tilemaps.TilemapLayer;
  lastTime = 0;
  timeTreshold = 100;

  maxPatrolDistance = 300;
  currentPatrolDistance = 0;

  ray: Phaser.Geom.Line;
  raySize = 25;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
  ) {
    super(scene, x, y, key);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.graphics = this.scene.add.graphics({
      lineStyle: { width: 2, color: 0xff0000 },
    });
    this.ray = new Phaser.Geom.Line();
    this.init();
  }

  init() {
    this.setGravityY(this.gravity)
      .setCollideWorldBounds(true)
      .setOrigin(0.5, 1)
      .setImmovable(true)
      .setBodySize(20, 45)
      .setOffset(10, 20)
      .setVelocityX(this.speed);
  }

  override preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.patrol(time);
  }

  patrol(time: number) {
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (!body.onFloor()) return;

    this.currentPatrolDistance += body.deltaAbsX();

    const shouldTurn = this.currentPatrolDistance >= this.maxPatrolDistance;
    const hashit = this.raycast();
    if ((!hashit || shouldTurn) && this.lastTime + this.timeTreshold < time) {
      this.speed = -this.speed;
      this.setFlipX(!this.flipX);
      this.setVelocityX(this.speed);
      this.lastTime = time;
      this.currentPatrolDistance = 0;
    }
  }

  raycast() {
    let hashit = false;
    const body = this.body as Phaser.Physics.Arcade.Body;

    switch (body.facing) {
      case Phaser.Physics.Arcade.FACING_LEFT: {
        const x1 = body.x;
        const y1 = body.y + body.halfHeight;
        this.ray.setTo(x1, y1, x1 - this.raySize * this.steepnes, y1 + this.raySize);
        break;
      }
      case Phaser.Physics.Arcade.FACING_RIGHT: {
        const x1 = body.x + body.width;
        const y1 = body.y + body.halfHeight;
        this.ray.setTo(x1, y1, x1 + this.raySize * this.steepnes, y1 + this.raySize);
        break;
      }
    }

    this.graphics.clear();
    this.graphics.strokeLineShape(this.ray);

    if (this.colliderLayer) {
      const hits = this.colliderLayer.getTilesWithinShape(this.ray);

      if (hits.length > 0) {
        hashit = hits.some((tile) => tile.index !== -1);
      }
    }
    return hashit;
  }

  setColliderLayer(layer: Phaser.Tilemaps.TilemapLayer) {
    this.colliderLayer = layer;
  }
}
