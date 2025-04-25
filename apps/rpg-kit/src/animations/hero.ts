const walkingFrame = (rootFrame: number) => {
  return {
    duration: 400,
    frames: [
      { time: 0, frame: rootFrame + 1 },
      { time: 100, frame: rootFrame },
      { time: 200, frame: rootFrame + 1 },
      { time: 300, frame: rootFrame + 2 },
    ],
  };
};

const standingFrame = (rootFrame: number) => {
  return {
    duration: 400,
    frames: [{ time: 0, frame: rootFrame }],
  };
};

export const STAND_DOWN = standingFrame(1);
export const STAND_RIGHT = standingFrame(4);
export const STAND_UP = standingFrame(7);
export const STAND_LEFT = standingFrame(10);

export const WALK_DOWN = walkingFrame(0);
export const WALK_RIGHT = walkingFrame(3);
export const WALK_UP = walkingFrame(6);
export const WALK_LEFT = walkingFrame(9);

export const PICK_UP_DOWN = {
  duration: 300,
  frames: [
    { time: 0, frame: 12 },
    { time: 100, frame: 13 },
    { time: 200, frame: 14 },
  ],
};
