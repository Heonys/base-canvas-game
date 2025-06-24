import { SHARED_CONFIG } from "@/main";
import { Weapon } from "@/attacks";
import { Projectiles } from "@/groups";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  hp = 400;
  damage = 20;
  speed = 50;
  gravity = 500;
  steepnes = 0.2;
  facing = Phaser.Physics.Arcade.FACING_RIGHT;

  graphics: Phaser.GameObjects.Graphics;
  colliderLayer?: Phaser.Tilemaps.TilemapLayer;
  projectiles?: Projectiles;
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
    public restart?: boolean,
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
      .setVelocityX(this.speed);
  }

  override preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (this.getBounds().bottom > this.scene.scale.height) {
      this.graphics.clear();
      this.setActive(false);
      this.destroy();
      return;
    }
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
        this.facing = Phaser.Physics.Arcade.FACING_LEFT;
        break;
      }
      case Phaser.Physics.Arcade.FACING_RIGHT: {
        const x1 = body.x + body.width;
        const y1 = body.y + body.halfHeight;
        this.ray.setTo(x1, y1, x1 + this.raySize * this.steepnes, y1 + this.raySize);
        this.facing = Phaser.Physics.Arcade.FACING_RIGHT;
        break;
      }
    }

    if (SHARED_CONFIG.debug) {
      this.graphics.clear();
      this.graphics.strokeLineShape(this.ray);
    }

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

  onHit(source: Weapon) {
    this.hp -= source.damage;
    source.cleanupHit(this);

    if (this.hp <= 0) {
      this.setTint(0xff0000);
      this.setVelocity(0, -200);
      this.body!.checkCollision.none = true;
      this.setCollideWorldBounds(false);
    }
  }

  cleanupHit(_target: Phaser.Physics.Arcade.Sprite) {}

  isPlayingAnims(key: string) {
    return this.anims.isPlaying && this.anims.currentAnim?.key === key;
  }
}
