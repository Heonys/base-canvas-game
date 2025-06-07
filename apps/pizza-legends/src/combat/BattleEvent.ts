import { eventEmitter, GameObject } from "@/core";
import { Combatant, Command } from "@/combat";

type Resolve = (value?: unknown) => void;
export type BattleEvents =
  | { type: "textbox"; message: string; caster?: string; enemy?: string; action?: string }
  | { type: "command"; caster: Combatant; enemy: Combatant }
  | { type: "animation"; animation: string }
  | { type: "state"; damage: number };

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
      onComplate: (actions) => resolve(actions),
    });
  }

  animation() {}

  state() {}
}
