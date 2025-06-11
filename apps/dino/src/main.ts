import Phaser from "phaser";
import { PreloadScene, PlayScene } from "@/scenes";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
  },
  scene: [PreloadScene, PlayScene],
};

new Phaser.Game(config);
