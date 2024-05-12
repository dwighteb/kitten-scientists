import { Maybe, isNil } from "@oliversalzburg/js-utils/nil.js";
import { consumeEntriesPedantic } from "../tools/Entries.js";
import { Race, Races, Season } from "../types/index.js";
import { EmbassySettings } from "./EmbassySettings.js";
import {
  Requirement,
  Setting,
  SettingBuySellTrigger,
  SettingLimited,
  SettingTrigger,
} from "./Settings.js";

export class TradeSettingsItem extends SettingLimited {
  readonly #race: Race;
  readonly seasons: Record<Season, Setting>;

  /**
   * A resource that is required to trade with the race.
   */
  readonly #require: Requirement;

  get race() {
    return this.#race;
  }
  get require() {
    return this.#require;
  }

  constructor(
    race: Race,
    enabled: boolean,
    limited: boolean,
    summer: boolean,
    autumn: boolean,
    winter: boolean,
    spring: boolean,
    require: Requirement = false,
  ) {
    super(enabled, limited);
    this.#race = race;
    this.seasons = {
      summer: new Setting(summer),
      autumn: new Setting(autumn),
      winter: new Setting(winter),
      spring: new Setting(spring),
    };
    this.#require = require;
  }
}

export type TradeSettingsItems = Record<Race, TradeSettingsItem>;

export class TradeSettings extends SettingTrigger {
  races: TradeSettingsItems;

  feedLeviathans: Setting;
  buildEmbassies: EmbassySettings;
  tradeBlackcoin: SettingBuySellTrigger;
  unlockRaces: Setting;

  constructor(
    enabled = false,
    trigger = 1,
    buildEmbassies = new EmbassySettings(),
    feedLeviathans = new Setting(false),
    tradeBlackcoin = new SettingBuySellTrigger(false, 1090.0, 1095.0, 10000),
    unlockRaces = new Setting(true),
  ) {
    super(enabled, trigger);
    this.races = this.initRaces();
    this.buildEmbassies = buildEmbassies;
    this.feedLeviathans = feedLeviathans;
    this.tradeBlackcoin = tradeBlackcoin;
    this.unlockRaces = unlockRaces;
  }

  private initRaces(): TradeSettingsItems {
    const defaultSeasons: Partial<Record<Race, Array<boolean>>> = {
      griffins: [false, true, false, false],
      lizards: [true, false, false, false],
      nagas: [true, false, false, true],
      sharks: [false, false, true, false],
      spiders: [true, true, false, true],
    };
    const defaultRequire: Partial<Record<Race, Requirement>> = {
      dragons: "titanium",
      griffins: "wood",
      leviathans: "unobtainium",
      lizards: "minerals",
      sharks: "iron",
    };
    const items = {} as TradeSettingsItems;
    Races.forEach(item => {
      const seasons = defaultSeasons[item] ?? [true, true, true, true];
      const require = defaultRequire[item] ?? false;
      items[item] = new TradeSettingsItem(
        item,
        true,
        true,
        seasons[0],
        seasons[1],
        seasons[2],
        seasons[3],
        require,
      );
    });
    return items;
  }

  load(settings: Maybe<Partial<TradeSettings>>) {
    if (isNil(settings)) {
      return;
    }

    super.load(settings);

    consumeEntriesPedantic(this.races, settings.races, (race, item) => {
      race.enabled = item?.enabled ?? race.enabled;
      race.limited = item?.limited ?? race.limited;
      race.seasons.autumn.enabled = item?.seasons?.autumn.enabled ?? race.seasons.autumn.enabled;
      race.seasons.spring.enabled = item?.seasons?.spring.enabled ?? race.seasons.spring.enabled;
      race.seasons.summer.enabled = item?.seasons?.summer.enabled ?? race.seasons.summer.enabled;
      race.seasons.winter.enabled = item?.seasons?.winter.enabled ?? race.seasons.winter.enabled;
    });

    this.buildEmbassies.load(settings.buildEmbassies);
    this.feedLeviathans.load(settings.feedLeviathans);
    this.tradeBlackcoin.load(settings.tradeBlackcoin);
    this.unlockRaces.load(settings.unlockRaces);
  }
}
