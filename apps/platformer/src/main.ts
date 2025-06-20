import Phaser from "phaser";
import { PreloadScene, PlayScene } from "@/scenes";

const WIDTH = 1000;
const HEIGHT = 600;
const ZOOM_FACTOR = 1.5;

export const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  debug: false,
  cameraTopLeft: {
    x: (WIDTH - WIDTH / ZOOM_FACTOR) / 2,
    y: (HEIGHT - HEIGHT / ZOOM_FACTOR) / 2,
  },
  cameraTopRight: {
    x: (WIDTH - WIDTH / ZOOM_FACTOR) / 2 + WIDTH / ZOOM_FACTOR,
    y: (HEIGHT - HEIGHT / ZOOM_FACTOR) / 2,
  },
};

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: SHARED_CONFIG.width,
    height: SHARED_CONFIG.height,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: SHARED_CONFIG.debug,
    },
  },
  scene: [PreloadScene, PlayScene],
};

new Phaser.Game(config);
