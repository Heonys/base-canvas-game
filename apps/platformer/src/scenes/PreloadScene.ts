export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/tilemap/customMap.tmj");
    this.load.image("tileset-1", "/images/main_lev_build_1.png");
    this.load.image("tileset-2", "/images/main_lev_build_2.png");

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
  }

  create() {
    this.scene.start("play");
  }
}
