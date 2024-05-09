import { Maybe, isNil } from "@oliversalzburg/js-utils/nil.js";
import { consumeEntriesPedantic } from "../tools/Entries.js";
import { SpaceBuildings, SpaceBuildingsArray } from "../types/index.js";
import { Setting, SettingTrigger } from "./Settings.js";

export class ResetSpaceBuildingSetting extends SettingTrigger {
  readonly #building: SpaceBuildings;

  get building() {
    return this.#building;
  }

  constructor(building: SpaceBuildings, enabled = false, trigger = -1) {
    super(enabled, trigger);
    this.#building = building;
  }
}

export type ResetSpaceBuildingSettings = Record<SpaceBuildings, SettingTrigger>;

export class ResetSpaceSettings extends Setting {
  readonly buildings: ResetSpaceBuildingSettings;

  constructor(enabled = false) {
    super(enabled);
    this.buildings = this.initBuildings();
  }

  private initBuildings(): ResetSpaceBuildingSettings {
    const items = {} as ResetSpaceBuildingSettings;
    SpaceBuildingsArray.forEach(item => {
      items[item] = new ResetSpaceBuildingSetting(item);
    });
    return items;
  }

  load(settings: Maybe<Partial<ResetSpaceSettings>>) {
    if (isNil(settings)) {
      return;
    }

    super.load(settings);

    consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
      building.enabled = item?.enabled ?? building.enabled;
      building.trigger = item?.trigger ?? building.trigger;
    });
  }
}
