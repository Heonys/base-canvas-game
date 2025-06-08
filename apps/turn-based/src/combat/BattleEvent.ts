import { eventEmitter, GameObject } from "@/core";
import { Combatant, Command } from "@/combat";
import { delay } from "@/utils";

type Resolve = (value?: unknown) => void;
export type BattleEvents =
  | { type: "textbox"; message: string; caster?: string; enemy?: string; action?: string }
  | { type: "command"; caster: Combatant; enemy: Combatant }
  | { type: "state"; damage: number; caster?: Combatant; enemy?: Combatant };

export class BattleEvent extends GameObject {
  constructor(public event: BattleEvents) {
    super();
  }

  start(resolve: Resolve) {
    this[this.event.type](resolve);
  }

  textbox(resolve: Resolve) {
    if (this.event.type !== "textbox") return;
    const { message, caster, enemy, action } = this.event;

    const parsedMessage = message
      .replace("{CASTER}", caster ?? "")
      .replace("{ACTION}", action ?? "")
      .replace("{ENEMY}", enemy ?? "");

    eventEmitter.emit("OPEN_TEXT_BOX", parsedMessage);

    const id = eventEmitter.on("END_TEXT_BOX", this, () => {
      eventEmitter.off(id);
      resolve();
    });
  }

  command(resolve: Resolve) {
    if (this.event.type !== "command") return;
    new Command({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: (actions) => resolve(actions),
    });
  }

  async state(resolve: Resolve) {
    if (this.event.type !== "state") return;
    const { damage, caster, enemy } = this.event;
    if (!caster || !enemy) return;

    enemy.config.hp -= damage;
    enemy.isBlink = true;
    await delay(500);
    enemy.isBlink = false;
    resolve();
  }
}
