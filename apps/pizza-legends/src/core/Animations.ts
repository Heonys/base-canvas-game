export type Keyframe = {
  duration: number;
  frames: {
    time: number;
    frame: number;
  }[];
};

export class Animations {
  activeKey: string;

  constructor() {
    this.activeKey = "";
  }

  get frame() {
    return "";
  }

  step(_delta: number) {}

  play() {}
}
