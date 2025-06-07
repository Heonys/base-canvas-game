import { BattleEvents } from "@/combat";

class Actions {
  private actionsMap = new Map<string, BattleEvents[]>();

  addAction(name: string, flow: BattleEvents[]) {
    this.actionsMap.set(name, flow);
  }

  find(name: string) {
    return this.actionsMap.get(name);
  }
}

const actions = new Actions();

actions.addAction("damage1", [
  { type: "textbox", message: "{CASTER} uses {ACTION}! for {ENEMY}" },
  // { type: "animation", animation: "spin" },
  // { type: "state", damage: 10 },
]);

export { actions };
