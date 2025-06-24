import { SHARED_CONFIG } from "@/main";

export class Hud extends Phaser.GameObjects.Container {
  scoreText!: Phaser.GameObjects.Text;
  scoreImage!: Phaser.GameObjects.Image;
  width = 60;

  constructor(public scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);

    this.setPosition(
      SHARED_CONFIG.cameraTopRight.x - this.width,
      SHARED_CONFIG.cameraTopRight.y + 5,
    );
    this.setScrollFactor(0);
    this.setupList();
  }

  setupList() {
    this.scoreText = this.scene.add
      .text(0, 0, "0", {
        fontSize: "20px",
        color: "#fff",
      })
      .setName("scoreText");
    this.scoreImage = this.scene.add.image(this.scoreText.width + 5, 0, "diamond").setOrigin(0);
    this.add([this.scoreImage, this.scoreText]);
  }

  updateScore(score: number) {
    this.scoreText.setText(`${score}`);
    this.scoreImage.setX(this.scoreText.width + 5);
  }
}
