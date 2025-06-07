import { Battle, BattleEvent, BattleEvents } from "@/combat";
import { Team } from "@/constants";
import { oppositeTeam } from "@/utils";

export class TurnCycle {
  currentTeam: Team = "player";

  constructor(public battle: Battle) {}

  async waitForEvent(event: BattleEvents) {
    return new Promise((resolve) => {
      new BattleEvent(event).start(resolve);
    });
  }

  async start() {
    await this.waitForEvent({ type: "textbox", message: "Battle is Starting" });
    this.turn();
  }

  async turn() {
    const caster = this.battle.teams[this.currentTeam].active!;
    const enemy = this.battle.teams[oppositeTeam(this.currentTeam)].active!;

    const commands = (await this.waitForEvent({ type: "command", caster, enemy })) as {
      name: string;
      actions: BattleEvents[];
    };
    const { name, actions } = commands;

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];

      if (action.type === "textbox") {
        await this.waitForEvent({
          ...action,
          caster: caster.name,
          action: name,
          enemy: enemy.name,
        });
      } else {
        await this.waitForEvent(action);
      }
    }

    this.currentTeam = oppositeTeam(this.currentTeam);
    this.turn();
  }
}
