import { Battle } from "@/combat";
import { BattleType } from "@/constants";
import { ImageState } from "@/core";

type Config = {
  name: string;
  team: string;
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

export class Combatant {
  constructor(
    public config: Config,
    public battle: Battle,
  ) {}
}
