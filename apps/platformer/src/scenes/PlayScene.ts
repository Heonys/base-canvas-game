import { Weapon } from "@/attacks";
import { Collectable, Enemy, Player } from "@/entities";
import { Enemies, Collectables } from "@/groups";
import { Hud } from "@/hud";
import { SHARED_CONFIG } from "@/main";

export class PlayScene extends Phaser.Scene {
  player!: Player;
  enemies!: Enemies;
  collectables!: Collectables;
  hud!: Hud;

  score = 0;

  constructor() {
    super("play");
  }

  create() {
    const layer = this.createLayer();
    this.createAnimation();
    this.player = new Player(this, layer.startPoint.x!, layer.startPoint.y!);
    this.enemies = new Enemies(this);
    this.collectables = new Collectables(this);
    this.hud = new Hud(this);

    const endLine = this.physics.add
      .sprite(layer.endPoint.x!, layer.endPoint.y!, "empty")
      .setAlpha(0)
      .setBodySize(1, 200);

    const endLineOverlap = this.physics.add.overlap(this.player, endLine, () => {
      endLineOverlap.active = false;
    });

    layer.spawns.objects.forEach((spawnPoint) => {
      const enemy = new this.enemies.enemyClassMap[spawnPoint.type](
        this,
        spawnPoint.x!,
        spawnPoint.y!,
      );
      this.enemies.add(enemy);
      enemy.setColliderLayer(layer.colliders);
    });

    this.collectables.addLayer(layer.collectables);
    this.collectables.playAnimation("diamond-shine");

    this.player
      .addCollider(layer.colliders)
      .addCollider(this.enemies.projectiles, (_, it) => {
        const projectile = it as Weapon;
        this.player.onHit(projectile);
      })
      .addCollider(layer.traps, (_, it) => {
        const tile = it as any;
        this.player.onHit(tile);
      })
      .addOverlap(this.collectables, (_, it) => {
        const collectable = it as Collectable;
        this.score += collectable.score;
        collectable.disableBody(true, true);

        this.hud.updateScore(this.score);
      });

    this.enemies
      .addCollider(layer.colliders)
      .addCollider(this.player, (enemy) => {
        this.player.onHit(enemy as Enemy);
      })
      .addCollider(this.player.projectiles, (enemy, projectile) => {
        (enemy as Enemy).onHit(projectile as Weapon);
      })
      .addOverlap(this.player.melee, (enemy, melee) => {
        (enemy as Enemy).onHit(melee as Weapon);
      });
    this.setupCamera(this.player);
  }

  createLayer() {
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("main_lev_build_1", "tileset-1")!;
    // const tileset2 = map.addTilesetImage("main_lev_build_2", "tileset-2")!;

    const colliders = map.createLayer("colliders", tileset1)!;
    colliders.setCollisionByExclusion([-1], true);

    map.createLayer("environment", tileset1);
    map.createLayer("platforms", tileset1);
    const traps = map.createLayer("traps", tileset1)!;
    traps.setCollisionByExclusion([-1], true);

    const points = map.getObjectLayer("points")!;
    const spawns = map.getObjectLayer("spawns")!;
    const collectables = map.getObjectLayer("collectables")!;

    const startPoint = points.objects.find((it) => it.name === "start")!;
    const endPoint = points.objects.find((it) => it.name === "end")!;

    return { colliders, startPoint, endPoint, spawns, collectables, traps };
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

    this.anims.create({
      key: "diamond-shine",
      frames: [
        { key: "diamond-1" },
        { key: "diamond-2" },
        { key: "diamond-3" },
        { key: "diamond-4" },
        { key: "diamond-5" },
        { key: "diamond-6" },
      ],
      frameRate: 5,
      repeat: -1,
    });
  }
}
