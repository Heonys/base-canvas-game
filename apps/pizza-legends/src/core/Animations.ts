import { FrameManager } from "@/core";

export class Animations {
  activeKey: string;

  constructor(public keyframes: Record<string, FrameManager>) {
    this.activeKey = Object.keys(keyframes)[0];
  }

  get frame() {
    return this.keyframes[this.activeKey].frame;
  }

  step(delta: number) {
    this.keyframes[this.activeKey].step(delta);
  }

  play(key: string, startAtTime: number = 0) {
    if (this.activeKey === key) return;
    this.activeKey = key;
    this.keyframes[this.activeKey].currentTime = startAtTime;
  }
}
