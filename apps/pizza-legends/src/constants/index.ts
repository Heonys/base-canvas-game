import type { Combatant } from "@/combat";
import type { ImageState } from "@/core";

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

export type Team = "player" | "enemy";
type BattleTeam = {
  queue: Combatant[];
  active: Combatant | null;
};
export type Teams = Record<Team, BattleTeam>;
export type CombatantConfig = {
  name: string;
  team: Team;
  type: BattleType;
  src: ImageState;
  icon: ImageState;
  hp: number;
  maxHp: number;
  exp: number;
  level: number;
  actions?: string[];
  status: any;
};
