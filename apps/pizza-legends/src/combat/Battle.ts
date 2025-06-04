import { Combatant } from "@/combat";
import { BattleType } from "@/constants";
import { resources } from "@/core";

type Config = {
  onComplete: () => void;
};

export class Battle {
  combatants: Combatant[] = [];

  constructor(public config: Config) {
    this.combatants = [
      new Combatant(
        {
          name: "Slice Samurai",
          type: BattleType.spicy,
          src: resources.images.s001,
          icon: resources.images.spicy,
          team: "player",
          hp: 30,
          maxHp: 50,
          exp: 75,
          level: 1,
          status: null,
        },
        this,
      ),
      new Combatant(
        {
          name: "Call Me Kale",
          type: BattleType.veggie,
          src: resources.images.v001,
          icon: resources.images.veggie,
          team: "enemy",
          hp: 20,
          maxHp: 50,
          exp: 20,
          level: 1,
          status: null,
        },
        this,
      ),
    ];
  }

  start() {}
}
