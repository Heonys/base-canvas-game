export type Keyframe = {
  duration: number;
  frames: {
    time: number;
    frame: number;
  }[];
};

export class FrameManager {
  duration: number;
  currentTime: number = 0;

  constructor(public keyframe: Keyframe) {
    this.duration = keyframe.duration;
  }

  get frame() {
    const { frames } = this.keyframe;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this.currentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }
    throw new Error("Time is before the first keyframe");
  }

  step(delta: number) {
    this.currentTime += delta;
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
  }
}
