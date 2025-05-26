export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export const enum Layer {
  Lower = "Lower",
  Main = "Main",
  Upper = "Upper",
}

export const keyToDirection: Record<string, Direction> = {
  ArrowUp: Direction.UP,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
  ArrowRight: Direction.RIGHT,
  KeyW: Direction.UP,
  KeyS: Direction.DOWN,
  KeyA: Direction.LEFT,
  KeyD: Direction.RIGHT,
};
