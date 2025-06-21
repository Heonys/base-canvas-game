import { Weapon } from "@/attacks";
import { Enemy, Player } from "@/entities";
import { Enemies } from "@/groups";
import { SHARED_CONFIG } from "@/main";

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
    this.physics.add.collider(this.player, this.enemies.projectiles, (_player, object) => {
      const projectile = object as Weapon;
      this.player.handleHit(projectile);
    });
    this.enemies
      .addCollider(layer.colliders)
      .addCollider(this.player, (enemy) => {
        this.player.handleHit(enemy as Enemy);
      })
      .addCollider(this.player.projectiles, (enemy, projectile) => {
        (enemy as Enemy).onHit(projectile as Weapon);
      })
      .addOverlap(this.player.melee, (enemy, melee) => {
        (enemy as Enemy).onHit(melee as Weapon);
      });
    this.setupCamera(this.player);
    this.createAnimation();
  }

  createLayer() {
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("main_lev_build_1", "tileset-1")!;
    // const tileset2 = map.addTilesetImage("main_lev_build_2", "tileset-2")!;
    const colliders = map.createLayer("colliders", tileset1)!;
    colliders.setCollisionByExclusion([-1], true);

    map.createLayer("environment", tileset1);
    map.createLayer("platforms", tileset1)!;

    const points = map.getObjectLayer("points")?.objects ?? [];
    const spawns = map.getObjectLayer("spawns")?.objects ?? [];

    const startPoint = points.find((it) => it.name === "start")!;
    const endPoint = points.find((it) => it.name === "end")!;

    return { colliders, startPoint, endPoint, spawns };
  }

  setupCamera(object: Phaser.Physics.Arcade.Sprite) {
    const OFFSET = 600;
    this.physics.world.setBounds(0, 0, this.scale.width + OFFSET, this.scale.height + 200);
    this.cameras.main
      .setBounds(0, 0, this.scale.width + OFFSET, this.scale.height)
      .setZoom(SHARED_CONFIG.zoomFactor);
    this.cameras.main.startFollow(object);
  }

  createAnimation() {
    this.anims.create({
      key: "hit-effect",
      frames: this.anims.generateFrameNumbers("hit-effect", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: 0,
    });
  }
}
