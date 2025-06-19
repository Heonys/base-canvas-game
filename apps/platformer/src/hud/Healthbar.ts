export class HealthBar {
  graphic: Phaser.GameObjects.Graphics;
  width = 100;
  height = 10;
  pixelPer: number;

  constructor(
    public scene: Phaser.Scene,
    public health: number,
    public x: number,
    public y: number,
  ) {
    this.graphic = new Phaser.GameObjects.Graphics(this.scene);
    this.scene.add.existing(this.graphic);

    this.pixelPer = this.width / health;
    this.graphic.setScrollFactor(0);
    this.draw();
  }

  draw() {
    const MARGIN = 2;
    this.graphic.fillStyle(0x000000);
    this.graphic.fillRect(this.x, this.y, this.width + MARGIN, this.height + MARGIN);

    this.graphic.fillStyle(0xffffff);
    this.graphic.fillRect(
      this.x + MARGIN,
      this.y + MARGIN,
      this.width - MARGIN,
      this.height - MARGIN,
    );

    const currentHealth = Math.floor(this.health * this.pixelPer);
    if (currentHealth > 0) {
      this.graphic.fillStyle(0x00ff00);
      this.graphic.fillRect(
        this.x + MARGIN,
        this.y + MARGIN,
        currentHealth - MARGIN,
        this.height - MARGIN,
      );
    }
  }

  decrease(amount: number) {
    if (amount <= 0) {
      this.health = 0;
    } else {
      this.health = amount;
    }
    this.draw();
  }
}
