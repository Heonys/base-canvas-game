import { Birdman, Enemy } from "@/entities";

type EnemyConstructor = new (scene: Phaser.Scene, x: number, y: number) => Enemy;

export class Enemies extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  get enemyClassMap(): Record<string, EnemyConstructor> {
    return { Birdman };
  }

  addCollider(
    object: Phaser.Types.Physics.Arcade.ArcadeColliderType,
    callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
  ) {
    this.scene.physics.add.collider(this, object, callback);
    return this;
  }
}
