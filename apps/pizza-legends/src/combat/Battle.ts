import { Combatant } from "@/combat";
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

  combatants: CombatantConfig[];
  field: MapObject;
  teams: Teams = {
    player: { queue: [], active: null },
    enemy: { queue: [], active: null },
  };

  constructor(public config: Config) {
    this.combatants = this.config.combatants;
    this.field = this.config.field;
    this.setupTeams();
    this.setupDrawing();
  }

  private setupTeams() {
    this.combatants.forEach((it) => {
      this.teams[it.team].queue.push(it);
    });
  }

  private setupDrawing() {
    // 일단은 config으로 들어오는 전투원 목록은 플에이어와 적이 최소 한개씩 있다고 가정
    const player = this.teams.player.queue[0];
    const enmy = this.teams.enemy.queue[0];

    this.field.addChild(new Combatant(this.playerPosition, { ...player }, this));
    this.field.addChild(new Combatant(this.enemyPosition, { ...enmy }, this));
  }

  start() {
    // 전투 시작 (보류)
  }
}
