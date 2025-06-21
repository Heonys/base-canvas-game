import { Birdman, Enemy, Snaky } from "@/entities";

type EnemyConstructor = new (scene: Phaser.Scene, x: number, y: number) => Enemy;

export class Enemies extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.createAnimation();
  }

  get enemyClassMap(): Record<string, EnemyConstructor> {
    return { Birdman, Snaky };
  }

  get projectiles() {
    const projectiles = new Phaser.GameObjects.Group(this.scene);

    this.getChildren().forEach((it) => {
      const enemy = it as Enemy;
      if (enemy.projectiles) {
        projectiles.addMultiple(enemy.projectiles.getChildren());
      }
    });
    return projectiles;
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

  createAnimation() {
    this.scene.anims.create({
      key: "birdman-idle",
      frames: this.scene.anims.generateFrameNumbers("birdman", { start: 0, end: 12 }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "birdman-hurt",
      frames: this.scene.anims.generateFrameNumbers("birdman", { start: 25, end: 26 }),
      frameRate: 10,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "snaky-idle",
      frames: this.scene.anims.generateFrameNumbers("snaky", { start: 0, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "snaky-hurt",
      frames: this.scene.anims.generateFrameNumbers("snaky", { start: 21, end: 22 }),
      frameRate: 10,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "fireball",
      frames: [{ key: "fireball-1" }, { key: "fireball-2" }],
      frameRate: 5,
      repeat: -1,
    });
  }
}
