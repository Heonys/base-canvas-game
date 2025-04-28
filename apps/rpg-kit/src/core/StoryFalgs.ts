import { Scenario } from "@/gameObjects";

export const enum Flag {
  TALKED_TO_A = "TALKED_TO_A",
  TALKED_TO_B = "TALKED_TO_B",
}

class StoryFlags {
  flagMap = new Map<Flag, boolean>();

  addFlag(flag: Flag) {
    this.flagMap.set(flag, true);
  }
  addFlags(flags: Flag[]) {
    flags.forEach((it) => this.flagMap.set(it, true));
  }

  getRelaventScenario(scenarios: Scenario[]) {
    return scenarios.find((scenario) => {
      const bypass = scenario.bypass ?? [];
      const requires = scenario.requires ?? [];

      const isBypassed = bypass.every((flag) => !this.flagMap.has(flag));
      const isRequired = requires.every((flag) => this.flagMap.has(flag));
      return isBypassed && isRequired;
    });
  }
}

export const storyFlags = new StoryFlags();
