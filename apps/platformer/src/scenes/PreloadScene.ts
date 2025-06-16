export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/tilemap/customMap.tmj");
    this.load.image("tileset-1", "/images/main_lev_build_1.png");
    this.load.image("tileset-2", "/images/main_lev_build_2.png");

    this.load.spritesheet("player", "/images/player/move_sprite_1.png", {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });
  }

  create() {
    this.scene.start("play");
  }
}
