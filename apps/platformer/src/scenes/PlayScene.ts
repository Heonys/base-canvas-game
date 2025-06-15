export class PlayScene extends Phaser.Scene {
  constructor() {
    super("play");
  }

  create() {
    const layer = this.createLayer();
    const player = this.createPalyer();

    this.physics.add.collider(player, layer.colliders);
  }

  createLayer() {
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("main_lev_build_1", "tileset-1")!;
    // const tileset2 = map.addTilesetImage("main_lev_build_2", "tileset-2")!;

    const colliders = map.createLayer("colliders", tileset1)!;
    const environment = map.createLayer("environment", tileset1);
    const platforms = map.createLayer("platforms", tileset1)!;

    colliders.setCollisionByExclusion([-1], true);

    return { environment, platforms, colliders };
  }

  createPalyer() {
    const player = this.physics.add.sprite(100, 250, "player");
    player.body.setGravityY(300);
    player.setCollideWorldBounds(true);
    return player;
  }
}
