import { Collectable } from "@/entities";

export class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  constructor(public scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.classType = Collectable;
  }

  addLayer(layer: Phaser.Tilemaps.ObjectLayer) {
    const properties = layer.properties?.reduce(
      (acc, cur) => {
        acc[cur.name] = cur.value;
        return acc;
      },
      {} as Record<string, any>,
    );
    layer.objects.forEach((it) => {
      const collectable = this.get(it.x!, it.y!, properties.texture) as Collectable;

      if (it.properties) {
        const property = it.properties.filter((it: any) => it.name === "score");
        collectable.score = property[0]?.value ?? collectable.score;
      }
    });
  }
}
