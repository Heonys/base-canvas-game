type Keyframe = {
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
    throw "Time is before the first keyframe";
  }

  step(delta: number) {
    this.currentTime += delta;
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
  }
}
/* 
등록된 단일 애니메이션의 키프레임을 보고 시간의 흐름에 따른 프레임 인덱스를 계산 하여 
Sprite에게 현재 시간에 맞는 프레임 인덱스를 반환함 
*/
