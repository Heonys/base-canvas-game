import { Combatant, TurnCycle } from "@/combat";
import { Vector2d } from "@/core";
import { gridCells } from "@/utils";
import { MapObject } from "@/maps";
import { CombatantConfig, Teams } from "@/constants";

type Config = {
  combatants: CombatantConfig[];
  onComplete?: () => void;
  field: MapObject;
};

export class Battle {
  playerPosition = new Vector2d(gridCells(1), gridCells(2));
  enemyPosition = new Vector2d(gridCells(6), gridCells(1));

  turnCycle: TurnCycle;
  field: MapObject;
  teams: Teams = {
    player: { queue: [], active: null },
    enemy: { queue: [], active: null },
  };

  constructor(public config: Config) {
    this.field = this.config.field;
    this.setupTeams();

    this.turnCycle = new TurnCycle(this);
    this.turnCycle.start();
  }

  private setupTeams() {
    this.config.combatants.forEach((config) => {
      const position = config.team === "player" ? this.playerPosition : this.enemyPosition;
      const combatant = new Combatant(position, config);

      const team = this.teams[config.team];
      team.queue.push(combatant);
      if (!team.active) {
        team.active = combatant;
        this.field.addChild(combatant);
      }
    });
  }

  start() {
    // 전투 시작 (보류)
  }
}
