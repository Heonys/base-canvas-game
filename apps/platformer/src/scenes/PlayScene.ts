import { Player } from "@/entities";
import { Enemies } from "@/groups";

export class PlayScene extends Phaser.Scene {
  player!: Player;
  enemies!: Enemies;

  constructor() {
    super("play");
  }

  create() {
    const layer = this.createLayer();
    this.player = new Player(this, layer.startPoint.x!, layer.startPoint.y!);
    this.enemies = new Enemies(this);

    const endLine = this.physics.add
      .sprite(layer.endPoint.x!, layer.endPoint.y!, "empty")
      .setAlpha(0)
      .setBodySize(1, 200);

    const endLineOverlap = this.physics.add.overlap(this.player, endLine, () => {
      endLineOverlap.active = false;
    });

    layer.spawns.forEach((spawnPoint) => {
      const enemy = new this.enemies.enemyClassMap[spawnPoint.type](
        this,
        spawnPoint.x!,
        spawnPoint.y!,
      );
      this.enemies.add(enemy);
      enemy.setColliderLayer(layer.colliders);
    });

    this.physics.add.collider(this.player, layer.colliders);
    this.enemies.addCollider(this.player).addCollider(layer.colliders);
    this.setupCamera(this.player);
  }

  createLayer() {
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("main_lev_build_1", "tileset-1")!;
    // const tileset2 = map.addTilesetImage("main_lev_build_2", "tileset-2")!;
    const colliders = map.createLayer("colliders", tileset1)!;
    colliders.setCollisionByExclusion([-1], true);

    const environment = map.createLayer("environment", tileset1);
    const platforms = map.createLayer("platforms", tileset1)!;
    const points = map.getObjectLayer("points")?.objects ?? [];
    const spawns = map.getObjectLayer("spawns")?.objects ?? [];

    const startPoint = points.find((it) => it.name === "start")!;
    const endPoint = points.find((it) => it.name === "end")!;

    return { environment, platforms, colliders, startPoint, endPoint, spawns };
  }

  setupCamera(object: Phaser.Physics.Arcade.Sprite) {
    const OFFSET = 600;
    this.physics.world.setBounds(0, 0, this.scale.width + OFFSET, this.scale.height + 200);
    this.cameras.main.setBounds(0, 0, this.scale.width + OFFSET, this.scale.height).setZoom(1.5);
    this.cameras.main.startFollow(object);
  }
}
