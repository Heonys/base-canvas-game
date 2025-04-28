import { GameObject, Vector2, Flag, storyFlags } from "@/core";

export type Scenario = {
  text: string;
  requires?: Flag[];
  bypass?: Flag[];
  addFlag?: Flag[];
};

export type NpcConfig = {
  position: Vector2;
  scenarios: Scenario[];
  portraitFrame: number;
};

export class Npc extends GameObject {
  portraitFrame: number;
  scenarios: Scenario[];

  constructor({ position, portraitFrame, scenarios }: NpcConfig) {
    super(position);
    this.portraitFrame = portraitFrame;
    this.scenarios = scenarios;
    this.isSolid = true;
  }

  getContents() {
    const match = storyFlags.getRelaventScenario(this.scenarios);
    if (!match) return null;

    return {
      text: match.text,
      addFlag: match.addFlag,
      portraitFrame: this.portraitFrame,
    };
  }
}
