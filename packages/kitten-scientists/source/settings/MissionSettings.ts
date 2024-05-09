import { difference } from "@oliversalzburg/js-utils/data/array.js";
import { Maybe, isNil } from "@oliversalzburg/js-utils/nil.js";
import { consumeEntriesPedantic } from "../tools/Entries.js";
import { cwarn } from "../tools/Log.js";
import { Game, Missions, MissionsArray } from "../types/index.js";
import { Setting } from "./Settings.js";

export class MissionSetting extends Setting {
  readonly #mission: Missions;

  get mission() {
    return this.#mission;
  }

  constructor(mission: Missions, enabled = false) {
    super(enabled);
    this.#mission = mission;
  }
}

export type MissionMissionSettings = Record<Missions, MissionSetting>;

export class MissionSettings extends Setting {
  missions: MissionMissionSettings;

  constructor(enabled = false) {
    super(enabled);
    this.missions = this.initMissions();
  }

  private initMissions(): MissionMissionSettings {
    const items = {} as MissionMissionSettings;
    MissionsArray.forEach(item => {
      items[item] = new MissionSetting(item, true);
    });
    return items;
  }

  static validateGame(game: Game, settings: MissionSettings) {
    const inSettings = Object.keys(settings.missions);
    // TODO: Find a better place in the game where this information is *always* available.
    const inGame = (game.space.programs ?? []).map(program => program.name);

    const missingInSettings = difference(inGame, inSettings);
    const redundantInSettings = difference(inSettings, inGame);

    for (const mission of missingInSettings) {
      cwarn(`The space mission '${mission}' is not tracked in Kitten Scientists!`);
    }
    for (const mission of redundantInSettings) {
      cwarn(`The space mission '${mission}' is not a space mission in Kittens Game!`);
    }
  }

  load(settings: Maybe<Partial<MissionSettings>>) {
    if (isNil(settings)) {
      return;
    }

    super.load(settings);

    consumeEntriesPedantic(this.missions, settings.missions, (mission, item) => {
      mission.enabled = item?.enabled ?? mission.enabled;
    });
  }
}
