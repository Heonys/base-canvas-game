import { Layer } from "@/constants";
import { GameObject } from "@/core";

type Resolve = () => void;
type FadeDirection = "IN" | "OUT";

export class SceneTransition extends GameObject {
  opacity = 0;
  isActive = false;
  fadeDirection: FadeDirection = "IN";
  duration = 500;
  elapsedTime = 0;
  resolve?: Resolve;

  constructor() {
    super();
    this.layer = Layer.Upper;
  }

  fadeOut(callback: Resolve) {
    this.startTransition("OUT", callback);
  }

  fadeIn(callback: Resolve) {
    this.startTransition("IN", callback);
  }

  startTransition(direction: FadeDirection, callback: Resolve) {
    this.isActive = true;
    this.fadeDirection = direction;
    this.elapsedTime = 0;
    this.resolve = callback;
  }

  step(delta: number) {
    if (!this.isActive) return;

    this.elapsedTime += delta;
    const ratio = Math.min(this.elapsedTime / this.duration, 1);
    this.opacity = this.fadeDirection === "OUT" ? ratio : 1 - ratio;

    if (ratio >= 1) {
      this.isActive = false;
      this.resolve?.();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.opacity === 0) return;
    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  }
}
