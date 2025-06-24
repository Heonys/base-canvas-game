export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.tilemapTiledJSON("level-1", "/tilemap/customMap.tmj");
    this.load.tilemapTiledJSON("level-2", "/tilemap/customMap2.tmj");
    this.load.image("tileset-1", "/images/main_lev_build_1.png");
    this.load.image("tileset-2", "/images/main_lev_build_2.png");

    this.load.image("bg-dark", "/images/bg-dark.png");
    this.load.image("bg-sky", "/images/background_0.png");

    this.load.image("diamond", "/images/collectibles/diamond.png");
    this.load.image("diamond-1", "/images/collectibles/diamond_big_01.png");
    this.load.image("diamond-2", "/images/collectibles/diamond_big_02.png");
    this.load.image("diamond-3", "/images/collectibles/diamond_big_03.png");
    this.load.image("diamond-4", "/images/collectibles/diamond_big_04.png");
    this.load.image("diamond-5", "/images/collectibles/diamond_big_05.png");
    this.load.image("diamond-6", "/images/collectibles/diamond_big_06.png");

    this.load.image("fireball-1", "/images/weapons/improved_fireball_001.png");
    this.load.image("fireball-2", "/images/weapons/improved_fireball_002.png");

    this.load.image("iceball-1", "/images/weapons/iceball_impact_001.png");
    this.load.image("iceball-2", "/images/weapons/iceball_impact_002.png");
    this.load.image("iceball-3", "/images/weapons/iceball_impact_003.png");

    this.load.spritesheet("hit-effect", "/images/weapons/hit_effect_sheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("player", "/images/player/move_sprite_1.png", {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });

    this.load.spritesheet("player-slide", "/images/player/slide_sheet_2.png", {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });

    this.load.spritesheet("birdman", "/images/enemy/enemy_sheet.png", {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32,
    });

    this.load.spritesheet("snaky", "/images/enemy/enemy_sheet_2.png", {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32,
    });

    this.load.spritesheet("player-throw", "/images/player/throw_attack_sheet_1.png", {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });

    this.load.spritesheet("shword-attack", "/images/weapons/sword_sheet_1.png", {
      frameWidth: 52,
      frameHeight: 32,
      spacing: 16,
    });

    this.load.once("complete", () => {
      this.startGame();
    });
  }

  startGame() {
    this.registry.set("level", 1);
    this.scene.start("play");
  }
}
