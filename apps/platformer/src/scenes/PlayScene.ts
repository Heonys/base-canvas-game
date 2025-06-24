import { Weapon } from "@/attacks";
import { Collectable, Enemy, Player } from "@/entities";
import { Enemies, Collectables } from "@/groups";
import { Hud } from "@/hud";
import { SHARED_CONFIG } from "@/main";
import { eventEmitter } from "@/core";

export class PlayScene extends Phaser.Scene {
  player!: Player;
  enemies!: Enemies;
  collectables!: Collectables;
  hud!: Hud;
  bgDark!: Phaser.GameObjects.TileSprite;
  bgSky!: Phaser.GameObjects.TileSprite;

  score = 0;

  constructor() {
    super("play");
  }

  create(data?: { restart: boolean }) {
    if (!data?.restart) {
      this.setupEvents();
      this.createAnimation();
    }

    const layer = this.createLayer();
    this.player = new Player(this, layer.startPoint.x!, layer.startPoint.y!, data?.restart);
    this.enemies = new Enemies(this, data?.restart);
    this.collectables = new Collectables(this);
    this.hud = new Hud(this);

    this.createBackground(layer.bg);
    const endLine = this.physics.add
      .sprite(layer.endPoint.x!, layer.endPoint.y!, "empty")
      .setAlpha(0)
      .setBodySize(1, 200);

    const endLineOverlap = this.physics.add.overlap(this.player, endLine, () => {
      endLineOverlap.active = false;
      this.registry.inc("level");
      this.scene.restart({ restart: true });
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
    const map = this.make.tilemap({ key: `level-${this.getCurrentLevel()}` });
    const tileset1 = map.addTilesetImage("main_lev_build_1", "tileset-1")!;
    const bgTileset = map.addTilesetImage("bg-dark", "bg-dark")!;

    const colliders = map.createLayer("colliders", tileset1)!;
    colliders.setCollisionByExclusion([-1], true);

    map.createLayer("distance", bgTileset)?.setDepth(-12);
    map.createLayer("environment", tileset1);
    map.createLayer("platforms", tileset1);
    const traps = map.createLayer("traps", tileset1)!;
    traps.setCollisionByExclusion([-1], true);

    const points = map.getObjectLayer("points")!;
    const spawns = map.getObjectLayer("spawns")!;
    const collectables = map.getObjectLayer("collectables")!;
    const bg = map.getObjectLayer("bg")!.objects[0];

    const startPoint = points.objects.find((it) => it.name === "start")!;
    const endPoint = points.objects.find((it) => it.name === "end")!;

    return { colliders, startPoint, endPoint, spawns, collectables, traps, bg };
  }

  createBackground(tile: Phaser.Types.Tilemaps.TiledObject) {
    this.bgDark = this.add
      .tileSprite(tile.x!, tile.y!, this.scale.width, tile.height!, "bg-dark")
      .setOrigin(0, 1)
      .setDepth(-10)
      .setScrollFactor(0, 1);

    this.bgSky = this.add
      .tileSprite(0, 0, this.scale.width, 180, "bg-sky")
      .setOrigin(0, 0)
      .setDepth(-11)
      .setScrollFactor(0, 1)
      .setScale(1.5);
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

  setupEvents() {
    eventEmitter.on("PLAYER_LOOSE", () => {
      this.scene.restart({ restart: true });
    });
  }

  update() {
    this.bgDark.tilePositionX = this.cameras.main.scrollX * 0.3;
    this.bgSky.tilePositionX = this.cameras.main.scrollX * 0.1;
  }

  getCurrentLevel() {
    return this.registry.get("level") ?? 1;
  }
}
