import { actions, BattleEvents, Combatant } from "@/combat";

type Config = {
  caster: Combatant;
  enemy: Combatant;
  onComplete: (payload: { name: string; actions: BattleEvents[] }) => void;
};

export class Command {
  constructor(public config: Config) {
    this.decide();
  }

  decide() {
    const actionEvents = actions.find("damage1");
    if (!actionEvents) return;
    this.config.onComplete({ name: "damage1", actions: actionEvents });
  }
}
