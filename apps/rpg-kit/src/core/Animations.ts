import type { FrameManager } from "@/core";

export class Animations {
  activeKey: string;

  constructor(public patterns: Record<string, FrameManager>) {
    this.activeKey = Object.keys(patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  play(key: string, startAtTime = 0) {
    if (this.activeKey === key) return;

    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  step(delta: number) {
    this.patterns[this.activeKey].step(delta);
  }
}
/* 
Sprite에 등록된 모든 애니메이션을 관리함 
activeKeyf를 통해서 현재 어떤 애니메이션이 활성화되어 있는지를 관리하고 
FrameManager를 통해서 Sprite의 현재 프레임 업데이트 

*/
