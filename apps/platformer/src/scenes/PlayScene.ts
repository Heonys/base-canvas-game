import { Player } from "@/entities";

export class PlayScene extends Phaser.Scene {
  player!: Player;

  constructor() {
    super("play");
  }

  create() {
    this.player = new Player(this, 100, 250);
    const layer = this.createLayer();

    this.physics.add.collider(this.player, layer.colliders);
    this.setupCamera(this.player);
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

  setupCamera(object: Phaser.Physics.Arcade.Sprite) {
    const OFFSET = 600;
    this.physics.world.setBounds(0, 0, this.scale.width + OFFSET, this.scale.height + 200);
    this.cameras.main.setBounds(0, 0, this.scale.width + OFFSET, this.scale.height).setZoom(1.5);
    this.cameras.main.startFollow(object);
  }
}
