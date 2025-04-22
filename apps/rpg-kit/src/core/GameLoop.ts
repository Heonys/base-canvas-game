export class GameLoop {
  private rafId: number | null = null;
  private isRunning = false;
  private lastFrameTime = 0;
  private accumulatedTime = 0;
  private timeStep = 1000 / 60;

  constructor(
    private update: (timeSep: number) => any,
    private render: () => void,
  ) {}

  private mainLoop = (timestamp: number) => {
    if (!this.isRunning) return;

    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    this.accumulatedTime += deltaTime;
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();
    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  cancel() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
