export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
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

export type Behavior =
  | { type: "walk"; dir: Direction; destination: [x: number, y: number] }
  | { type: "stand"; dir: Direction; duration: number }
  | { type: "textbox"; message: string }
  | { type: "battle" };

export type CutsceneBehavior<T = Behavior> = T extends T ? T & { id: string } : never;

export enum BattleType {
  normal = "normal",
  spicy = "spicy",
  veggie = "veggie",
  fungi = "fungi",
  chill = "chill",
}
