// ==UserScript==
// @name        Kitten Scientists
// @version     2.0.0-alpha1
// @author      Oliver Salzburg <oliver.salzburg@gmail.com>
// @description Add-on for the wonderful incremental browser game: http://bloodrizer.ru/games/kittens/
// @homepage    https://github.com/oliversalzburg/cbc-kitten-scientists
// @supportURL  https://github.com/oliversalzburg/cbc-kitten-scientists/issues
// @match       *bloodrizer.ru/games/kittens/*
// @match       *kittensgame.com/alpha/*
// @match       *kittensgame.com/beta/*
// @match       *kittensgame.com/web/*
// @match       file:///*kitten-game*
// ==/UserScript==

!(function (t) {
  var e = {};
  function i(s) {
    if (e[s]) return e[s].exports;
    var o = (e[s] = { i: s, l: !1, exports: {} });
    return t[s].call(o.exports, o, o.exports, i), (o.l = !0), o.exports;
  }
  (i.m = t),
    (i.c = e),
    (i.d = function (t, e, s) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: s });
    }),
    (i.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var s = Object.create(null);
      if (
        (i.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          i.d(
            s,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return s;
    }),
    (i.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (i.p = ""),
    i((i.s = 14));
})([
  function (t, e, i) {
    "use strict";
    function s(t) {
      return null == t;
    }
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.mustExist = e.UnexpectedNilError = e.isNil = void 0),
      (e.isNil = s);
    class o extends Error {
      constructor(t = "unexpected nil value") {
        super(t);
      }
    }
    (e.UnexpectedNilError = o),
      (e.mustExist = function (t) {
        if (s(t)) throw new o();
        return t;
      });
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.objectEntries = void 0),
      (e.objectEntries = function (t) {
        return Object.entries(t);
      });
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.roundToTwo = e.ucfirst = void 0),
      (e.ucfirst = function (t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
      }),
      (e.roundToTwo = function (t) {
        return Math.round(100 * t) / 100;
      });
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.SettingsSectionUi = void 0);
    const s = i(2),
      o = i(10),
      a = i(0);
    e.SettingsSectionUi = class {
      constructor(t) {
        this._host = t;
      }
      getOptionHead(t) {
        const e = $("<ul/>", {
            id: "items-list-" + t,
            css: { display: "none", paddingLeft: "20px" },
          }),
          i = $("<div/>", {
            id: "toggle-all-items-" + t,
            text: this._host.i18n("ui.disable.all"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              textShadow: "3px 3px 4px gray",
              marginRight: "8px",
            },
          });
        i.on("click", function () {
          const t = e.children().children(":checkbox");
          t.prop("checked", !1), t.change(), e.children().children(":checkbox").change();
        }),
          e.append(i);
        const s = $("<div/>", {
          id: "toggle-all-items-" + t,
          text: this._host.i18n("ui.enable.all"),
          css: { cursor: "pointer", display: "inline-block", textShadow: "3px 3px 4px gray" },
        });
        return (
          s.on("click", function () {
            const t = e.children().children(":checkbox");
            t.prop("checked", !0), t.change(), e.children().children(":checkbox").change();
          }),
          e.append(s),
          e
        );
      }
      getOption(t, e, i, s = !1, a = {}) {
        const n = $("<li/>"),
          r = $("<label/>", {
            for: "toggle-" + t,
            text: i,
            css: { display: "inline-block", marginBottom: s ? "10px" : void 0, minWidth: "80px" },
          }),
          l = $("<input/>", { id: "toggle-" + t, type: "checkbox" }).data("option", e);
        return (
          (e.$enabled = l),
          l.on("change", () => {
            l.is(":checked") && !1 === e.enabled
              ? a.onCheck
                ? a.onCheck()
                : ((e.enabled = !0), o.clog("Unlogged action item"))
              : l.is(":checked") ||
                !0 !== e.enabled ||
                (a.onUnCheck ? a.onUnCheck() : ((e.enabled = !1), o.clog("Unlogged action item")));
          }),
          n.append(l, r),
          n
        );
      }
      getAllAvailableResourceOptions(t, e) {
        const i = [],
          o = t ? "#resource-reset-" : "#resource-";
        for (const t in this._host.gamePage.resPool.resources) {
          const a = this._host.gamePage.resPool.resources[t];
          if (a.name && 0 === $(o + a.name).length) {
            const t = $("<div/>", {
              id: "resource-add-" + a.name,
              text: s.ucfirst(a.title ? a.title : a.name),
              css: { cursor: "pointer", textShadow: "3px 3px 4px gray" },
            });
            t.on("click", () => {
              t.remove(), e(a);
            }),
              i.push(t);
          }
        }
        return i;
      }
      addNewResourceOption(t, e, i, s) {
        var o;
        const a = i.stock,
          n = null !== (o = i.consume) && void 0 !== o ? o : this._host.options.consume,
          r = $("<div/>", { id: "resource-" + t, css: { display: "inline-block", width: "100%" } }),
          l = $("<div/>", {
            id: "resource-label-" + t,
            text: e,
            css: { display: "inline-block", width: "95px" },
          }),
          h = $("<div/>", {
            id: "stock-value-" + t,
            text: this._host.i18n("resources.stock", [
              a === 1 / 0 ? "∞" : this._host.gamePage.getDisplayValueExt(a),
            ]),
            css: { cursor: "pointer", display: "inline-block", width: "80px" },
          }),
          c = $("<div/>", {
            id: "consume-rate-" + t,
            text: this._host.i18n("resources.consume", [n.toFixed(2)]),
            css: { cursor: "pointer", display: "inline-block" },
          }),
          g = $("<div/>", {
            id: "resource-delete-" + t,
            text: this._host.i18n("resources.del"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          });
        return (
          r.append(l, h, c, g),
          void 0 !== i && void 0 !== i.stock && this._setStockWarning(t, i.stock),
          h.on("click", () => {
            const s = window.prompt(
              this._host.i18n("resources.stock.set", [e]),
              i.stock.toFixed(0)
            );
            null !== s && this.setStockValue(t, parseInt(s), !1);
          }),
          c.on("click", () => {
            var t;
            const s = window.prompt(
              this._host.i18n("resources.consume.set", [e]),
              null === (t = i.consume) || void 0 === t ? void 0 : t.toFixed(2)
            );
            null !== s && (i.consume = parseFloat(s));
          }),
          g.on("click", () => {
            window.confirm(this._host.i18n("resources.del.confirm", [e])) && (r.remove(), s(t, i));
          }),
          (i.$consume = c),
          (i.$stock = h),
          r
        );
      }
      removeResourceOption(t) {
        const e = $("#resource-" + t).remove();
        e.length && e.remove();
      }
      addNewResourceOptionForReset(t, e, i, s) {
        const o = i.stockForReset,
          a = $("<div/>", {
            id: "resource-reset-" + t,
            css: { display: "inline-block", width: "100%" },
          }),
          n = $("<div/>", {
            id: "resource-label-" + t,
            text: e,
            css: { display: "inline-block", width: "95px" },
          }),
          r = $("<div/>", {
            id: "stock-value-" + t,
            text: this._host.i18n("resources.stock", [
              o === 1 / 0 ? "∞" : this._host.gamePage.getDisplayValueExt(o),
            ]),
            css: { cursor: "pointer", display: "inline-block", width: "80px" },
          }),
          l = $("<div/>", {
            id: "resource-delete-" + t,
            text: this._host.i18n("resources.del"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          });
        return (
          a.append(n, r, l),
          r.on("click", () => {
            const i = window.prompt(this._host.i18n("resources.stock.set", [e]));
            null !== i && this.setStockValue(t, parseInt(i), !0);
          }),
          l.on("click", () => {
            window.confirm(this._host.i18n("resources.del.confirm", [e])) && (a.remove(), s(t, i));
          }),
          (i.$stockForReset = r),
          a
        );
      }
      removeResourceOptionForReset(t) {
        const e = $("#resource-reset-" + t);
        e && e.remove();
      }
      _setStockWarning(t, e, i = !1) {
        const s = i ? "#resource-reset-" + t : "#resource-" + t;
        $(s).removeClass("stockWarn");
        const o = this._host.gamePage.resPool.resources.filter(e => e.name === t)[0].maxValue;
        ((e > o && 0 !== o) || e === 1 / 0) && $(s).addClass("stockWarn");
      }
      setStockValue(t, e, i = !1) {
        e < 0
          ? this._host.warning("ignoring non-numeric or invalid stock value " + e)
          : i
          ? ((e = e < 0 ? 1 / 0 : e),
            (a.mustExist(this._host.options.auto.timeCtrl.resources[t]).checkForReset = !0),
            (a.mustExist(this._host.options.auto.timeCtrl.resources[t]).stockForReset = e))
          : ((a.mustExist(this._host.options.auto.craft.resources[t]).enabled = !0),
            (a.mustExist(this._host.options.auto.craft.resources[t]).stock = e));
      }
      setConsumeRate(t, e) {
        e < 0 || 1 < e
          ? this._host.warning("ignoring non-numeric or invalid consume rate " + e)
          : (a.mustExist(this._host.options.auto.craft.resources[t]).consume = e);
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.SettingsSection = void 0);
    e.SettingsSection = class {
      constructor() {
        this.enabled = !1;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.CraftManager = void 0);
    const s = i(13),
      o = i(1),
      a = i(0);
    e.CraftManager = class {
      constructor(t) {
        (this._host = t), (this._cacheManager = new s.CacheManager(this._host));
      }
      craft(t, e) {
        if (((e = Math.floor(e)), !t || 1 > e)) return;
        if (!this._canCraft(t, e)) return;
        const i = this.getCraft(t),
          s = this._host.gamePage.getResCraftRatio(i.name);
        this._host.gamePage.craft(i.name, e);
        const o = a.mustExist(this._host.gamePage.resPool.get(t)).title;
        (e = parseFloat((e * (1 + s)).toFixed(2))),
          this._host.storeForSummary(o, e, "craft"),
          this._host.iactivity(
            "act.craft",
            [this._host.gamePage.getDisplayValueExt(e), o],
            "ks-craft"
          );
      }
      _canCraft(t, e) {
        const i = this.getCraft(t),
          s = a.mustExist(this._host.options.auto.craft.items[t]).enabled;
        let o = !1;
        if (i.unlocked && s) {
          o = !0;
          const t = this._host.gamePage.workshop.getCraftPrice(i);
          for (const i in t) {
            const s = t[i];
            this.getValueAvailable(s.name) < s.val * e && (o = !1);
          }
        }
        return o;
      }
      getCraft(t) {
        const e = this._host.gamePage.workshop.getCraft(t);
        if (!e) throw new Error(`Unable to find craft '${t}'`);
        return e;
      }
      singleCraftPossible(t) {
        const e = this.getMaterials(t);
        for (const [t, i] of o.objectEntries(e)) if (this.getValueAvailable(t, !0) < i) return !1;
        return !0;
      }
      getLowestCraftAmount(t, e, i, s) {
        const a = this.getMaterials(t),
          n = this.getCraft(t),
          r = this._host.gamePage.getResCraftRatio(n.name),
          l = this._host.options.auto.craft.trigger;
        if (!a) return 0;
        if ("steel" === t && e) {
          const t = this._host.gamePage.getResCraftRatio("plate");
          if (
            this.getValueAvailable("plate") / this.getValueAvailable("steel") <
            (t + 1) / 125 / ((r + 1) / 100)
          )
            return 0;
        }
        let h = Number.MAX_VALUE;
        if ("plate" === t && e) {
          const t = this._host.gamePage.getResCraftRatio("steel"),
            e = this._host.gamePage.getResourcePerTick("coal", !0);
          if (
            e > 0 &&
            this.getValueAvailable("plate") / this.getValueAvailable("steel") >
              (r + 1) / 125 / ((t + 1) / 100)
          ) {
            const t = this.getResource("coal").maxValue * l,
              i =
                ((t - this.getValue("coal")) / e) *
                Math.max(this._host.gamePage.getResourcePerTick("iron", !0), 0);
            h = (this.getValueAvailable("iron") - Math.max(t - i, 0)) / 125;
          }
        }
        const c =
            this._host.options.auto.options.enabled &&
            this._host.options.auto.options.items.shipOverride.enabled,
          g = this.getResource(t);
        let u = Number.MAX_VALUE;
        for (const [n, l] of o.objectEntries(a)) {
          let o = void 0;
          (o =
            !e ||
            (s && 0 < this.getResource(n).maxValue) ||
            ("ship" === t && c && this.getResource("ship").value < 243)
              ? this.getValueAvailable(n) / l
              : i *
                  ((this.getValueAvailable(n, !0) +
                    (l / (1 + r)) * this.getValueAvailable(g.name, !0)) /
                    l) -
                this.getValueAvailable(g.name, !0) / (1 + r)),
            (u = Math.min(o, u, h));
        }
        return (
          g.maxValue > 0 && u > g.maxValue - g.value && (u = g.maxValue - g.value), Math.floor(u)
        );
      }
      getMaterials(t) {
        const e = {},
          i = this.getCraft(t),
          s = this._host.gamePage.workshop.getCraftPrice(i);
        for (const t in s) {
          const i = s[t];
          e[i.name] = i.val;
        }
        return e;
      }
      getTickVal(t, e) {
        let i = this._host.gamePage.getResourcePerTick(t.name, !0);
        if (t.craftable) {
          let e = Number.MAX_VALUE;
          const s = this.getMaterials(t.name);
          for (const [i, a] of o.objectEntries(s)) {
            const s = (1 + this._host.gamePage.getResCraftRatio(t.name)) / a,
              o = this.getTickVal(this.getResource(i));
            "ignore" !== o && (e = Math.min(o * s, e));
          }
          i += e !== Number.MAX_VALUE ? e : 0;
        }
        return i <= 0 && ("spice" === t.name || "blueprint" === t.name)
          ? "ignore"
          : (e || (i += this._cacheManager.getResValue(t.name)), i);
      }
      getAverageHunt() {
        const t = {},
          e =
            this._host.gamePage.getEffect("hunterRatio") +
            this._host.gamePage.village.getEffectLeader("manager", 0);
        return (
          (t.furs = 40 + 32.5 * e),
          (t.ivory =
            50 * Math.min(0.225 + 0.01 * e, 0.5) + 40 * e * Math.min(0.225 + 0.01 * e, 0.5)),
          (t.unicorns = 0.05),
          this.getValue("zebras") >= 10 &&
            (t.bloodstone = 0 === this.getValue("bloodstone") ? 0.05 : 5e-4),
          this._host.gamePage.ironWill &&
            this._host.gamePage.workshop.get("goldOre").researched &&
            (t.gold = 0.625 + 0.625 * e),
          t
        );
      }
      getResource(t) {
        "slabs" === t && (t = "slab");
        const e = this._host.gamePage.resPool.get(t);
        if (a.isNil(e)) throw new Error("Unable to find resource " + t);
        return e;
      }
      getValue(t) {
        return this.getResource(t).value;
      }
      getStock(t) {
        const e = this._host.options.auto.craft.resources[t],
          i = e && e.enabled ? e.stock : 0;
        return i || 0;
      }
      getValueAvailable(t, e, i) {
        let s = this.getStock(t);
        if ("catnip" === t) {
          const t = this._host.gamePage.bld.getBuildingExt("pasture").meta,
            e = this._host.gamePage.bld.getBuildingExt("aqueduct").meta,
            i = 0 === t.stage ? t.val : 0,
            o = 0 === e.stage ? e.val : 0,
            a = this.getPotentialCatnip(!0, i, o);
          a < 0 && (s -= 202 * a * 5);
        }
        let o = this.getValue(t);
        if (((o = Math.max(o - s, 0)), !e && 0 < this.getResource(t).maxValue)) {
          let e;
          e = i || 0 === i ? i : this._host.options.auto.craft.trigger;
          const s = this._host.options.auto.craft.resources[t],
            a = s && s.enabled && void 0 !== s.consume ? s.consume : this._host.options.consume;
          o -= Math.min(this.getResource(t).maxValue * e, o) * (1 - a);
        }
        return o;
      }
      getPotentialCatnip(t, e, i) {
        let s = this._host.gamePage.getEffect("catnipPerTickBase");
        t
          ? ((s *= 0.1),
            (s *=
              1 +
              this._host.gamePage.getLimitedDR(this._host.gamePage.getEffect("coldHarshness"), 1)))
          : (s *=
              this._host.gamePage.calendar.getWeatherMod({ name: "catnip" }) +
              this._host.gamePage.calendar.getCurSeason().modifiers.catnip),
          this._host.gamePage.science.getPolicy("communism").researched && (s = 0);
        const o = this._host.gamePage.village.getResProduction();
        let a =
            s + (o.catnip ? o.catnip * (1 + this._host.gamePage.getEffect("catnipJobRatio")) : 0),
          n = this._host.gamePage.space.getBuilding("hydroponics").val;
        this._host.gamePage.prestige.meta[0].meta[21].researched &&
          (2 === this._host.gamePage.calendar.cycle && (n *= 2),
          7 === this._host.gamePage.calendar.cycle && (n *= 0.5)),
          (a *= 1 + 0.03 * i + 0.025 * n);
        (a *=
          1 +
          ("winterIsComing" === this._host.gamePage.challenges.currentChallenge
            ? 0
            : this._host.gamePage.prestige.getParagonProductionRatio())),
          (a *= 1 + this._host.gamePage.religion.getSolarRevolutionRatio()),
          this._host.gamePage.opts.disableCMBR || (a *= 1 + this._host.gamePage.getCMBRBonus()),
          (a = this._host.gamePage.calendar.cycleEffectsFestival({ catnip: a }).catnip);
        let r = this._host.gamePage.village.getResConsumption().catnip;
        const l = this._host.gamePage.bld.getBuildingExt("unicornPasture").meta.val;
        if (
          ((r *= 1 + this._host.gamePage.getLimitedDR(-0.005 * e + -0.0015 * l, 1)),
          this._host.gamePage.village.sim.kittens.length > 0 &&
            this._host.gamePage.village.happiness > 1)
        ) {
          const t = this._host.gamePage.village.happiness - 1,
            e = this._host.gamePage.getEffect("catnipDemandWorkerRatioGlobal");
          "anarchy" === this._host.gamePage.challenges.currentChallenge
            ? (r *= 1 + t * (1 + e))
            : (r *=
                1 +
                t *
                  (1 + e) *
                  (1 -
                    this._host.gamePage.village.getFreeKittens() /
                      this._host.gamePage.village.sim.kittens.length));
        }
        return (a += r), (a += this._host.gamePage.getResourcePerTickConvertion("catnip")), a;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const s = i(9);
    s.__exportStar(i(22), e),
      s.__exportStar(i(23), e),
      s.__exportStar(i(24), e),
      s.__exportStar(i(25), e),
      s.__exportStar(i(26), e),
      s.__exportStar(i(27), e);
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.TabManager = void 0);
    const s = i(0);
    e.TabManager = class {
      constructor(t, e) {
        this._host = t;
        const i = this._host.gamePage.tabs.find(t => t.tabId === e);
        if (s.isNil(i)) throw new Error("Unable to find tab " + e);
        (this.tab = i), this.render();
      }
      render() {
        return this._host.gamePage.ui.activeTabId !== this.tab.tabId && this.tab.render(), this;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.BulkManager = void 0);
    const s = i(5),
      o = i(1),
      a = i(0);
    e.BulkManager = class {
      constructor(t) {
        (this._host = t), (this._craftManager = new s.CraftManager(this._host));
      }
      bulk(t, e, i, s) {
        const n = [],
          r = [];
        let l = 0;
        for (const [h, c] of o.objectEntries(t)) {
          const t = a.mustExist(e[h]);
          if (!c.enabled) continue;
          if ("tHidden" in t && !0 === t.tHidden) continue;
          if ("rHidden" in t && !0 === t.rHidden) continue;
          if (t.unlocked) continue;
          if (
            "cryochambers" === h &&
            (a.mustExist(this._host.gamePage.time.getVSU("usedCryochambers")).val > 0 ||
              this._host.gamePage.bld.getBuildingExt("chronosphere").meta.val <= t.val)
          )
            continue;
          if ("ressourceRetrieval" === h && t.val >= 100) continue;
          const o = a.mustExist(this._isStagedBuild(t) ? t.stages[t.stage].prices : t.prices),
            g = this.getPriceRatio(t, s);
          if (!this.singleBuildPossible(t, o, g, s)) continue;
          const u = !!c.require && this._craftManager.getResource(c.require);
          if (!u || i <= u.value / u.maxValue) {
            if (this._isStagedBuild(t) && void 0 !== c.stage && c.stage !== t.stage) continue;
            n.push({
              count: 0,
              id: h,
              label: c.label,
              name: c.name,
              stage: c.stage,
              variant: c.variant,
            });
            const e = [],
              i =
                1 -
                this._host.gamePage.getLimitedDR(
                  this._host.gamePage.getEffect(h + "CostReduction"),
                  1
                );
            for (const t of o) {
              const s =
                1 -
                this._host.gamePage.getLimitedDR(
                  this._host.gamePage.getEffect(t.name + "CostReduction"),
                  1
                );
              e.push({ val: t.val * i * s, name: t.name });
            }
            r.push({
              id: h,
              name: c.name,
              count: 0,
              spot: l,
              prices: e,
              priceRatio: g,
              source: s,
              limit: c.max || 0,
              val: t.val,
            }),
              l++;
          }
        }
        if (0 === r.length) return [];
        const h = {};
        for (const t of this._host.gamePage.resPool.resources) h[t.name] = t.value;
        for (const [t, e] of o.objectEntries(h)) h[t] = this._craftManager.getValueAvailable(t, !0);
        let c = 0;
        for (; 0 !== r.length; ) {
          t: for (let t = 0; t < r.length; t++) {
            const i = r[t],
              s = a.mustExist(e[i.id]),
              o = i.prices,
              l = i.priceRatio,
              g = i.source;
            for (let e = 0; e < o.length; e++) {
              let a = !1,
                u = !1,
                d = 1 / 0,
                m = 1 / 0;
              if (g && "space" === g && "oil" === o[e].name) {
                a = !0;
                const t = this._host.gamePage.getEffect("oilReductionRatio");
                d = o[e].val * (1 - this._host.gamePage.getLimitedDR(t, 0.75));
              } else if ("cryochambers" === i.id && "karma" === o[e].name) {
                u = !0;
                const t = this._host.gamePage.prestige.getBurnedParagonRatio();
                m = o[e].val * (1 - this._host.gamePage.getLimitedDR(0.01 * t, 1));
              }
              let p = !1;
              if (
                ((p = a
                  ? h.oil < d * Math.pow(1.05, c + s.val)
                  : u
                  ? h.karma < m * Math.pow(l, c + s.val)
                  : h[o[e].name] < o[e].val * Math.pow(l, c + s.val)),
                p ||
                  ("noStackable" in s && s.noStackable && c + s.val >= 1) ||
                  ("ressourceRetrieval" === i.id && c + s.val >= 100) ||
                  ("cryochambers" === i.id &&
                    this._host.gamePage.bld.getBuildingExt("chronosphere").meta.val <= c + s.val))
              ) {
                for (let t = 0; t < e; t++)
                  if (g && "space" === g && "oil" === o[t].name) {
                    const e = this._host.gamePage.getEffect("oilReductionRatio"),
                      i = o[t].val * (1 - this._host.gamePage.getLimitedDR(e, 0.75));
                    h.oil += i * Math.pow(1.05, c + s.val);
                  } else if ("cryochambers" === i.id && "karma" === o[t].name) {
                    const e = this._host.gamePage.prestige.getBurnedParagonRatio(),
                      i = o[t].val * (1 - this._host.gamePage.getLimitedDR(0.01 * e, 1));
                    h.karma += i * Math.pow(l, c + s.val);
                  } else {
                    const e = o[t].val * Math.pow(l, c + s.val);
                    h[o[t].name] += "void" === o[t].name ? Math.ceil(e) : e;
                  }
                i.limit &&
                  -1 !== i.limit &&
                  (i.count = Math.max(0, Math.min(i.count, i.limit - i.val))),
                  (n[r[t].spot].count = r[t].count),
                  r.splice(t, 1),
                  t--;
                continue t;
              }
              if (a) h.oil -= d * Math.pow(1.05, c + s.val);
              else if (u) h.karma -= m * Math.pow(l, c + s.val);
              else {
                const t = o[e].val * Math.pow(l, c + s.val);
                h[o[e].name] -= "void" === o[e].name ? Math.ceil(t) : t;
              }
            }
            r[t].count++;
          }
          c++;
        }
        return n;
      }
      construct(t, e, i) {
        const s = t.metadata;
        let o = 0;
        if (
          (!a.isNil(s.limitBuild) && s.limitBuild - s.val < i && (i = s.limitBuild - s.val),
          (t.enabled && e.controller.hasResources(t)) || this._host.gamePage.devMode)
        ) {
          for (; e.controller.hasResources(t) && i > 0; )
            (t.prices = e.controller.getPrices(t)),
              e.controller.payPrice(t),
              e.controller.incrementValue(t),
              o++,
              i--;
          s.breakIronWill && (this._host.gamePage.ironWill = !1),
            s.unlocks && this._host.gamePage.unlock(s.unlocks),
            s.upgrades && this._host.gamePage.upgrade(s.upgrades);
        }
        return o;
      }
      _isStagedBuild(t) {
        return "stage" in t && "stages" in t && !a.isNil(t.stage) && !a.isNil(t.stages);
      }
      getPriceRatio(t, e) {
        const i = a.mustExist(
          this._isStagedBuild(t) ? t.priceRatio || t.stages[t.stage].priceRatio : t.priceRatio
        );
        let s = 0;
        return (
          e &&
            "bonfire" === e &&
            ((s =
              this._host.gamePage.getEffect(t.name + "PriceRatio") +
              this._host.gamePage.getEffect("priceRatio") +
              this._host.gamePage.getEffect("mapPriceReduction")),
            (s = this._host.gamePage.getLimitedDR(s, i - 1))),
          i + s
        );
      }
      singleBuildPossible(t, e, i, s) {
        const o =
          1 -
          this._host.gamePage.getLimitedDR(
            this._host.gamePage.getEffect(t.name + "CostReduction"),
            1
          );
        for (const a in e) {
          const n =
              1 -
              this._host.gamePage.getLimitedDR(
                this._host.gamePage.getEffect(e[a].name + "CostReduction"),
                1
              ),
            r = e[a].val * o * n;
          if (s && "space" === s && "oil" === e[a].name) {
            const e =
              r *
              (1 -
                this._host.gamePage.getLimitedDR(
                  this._host.gamePage.getEffect("oilReductionRatio"),
                  0.75
                ));
            if (this._craftManager.getValueAvailable("oil", !0) < e * Math.pow(1.05, t.val))
              return !1;
          } else if ("cryochambers" === t.name && "karma" === e[a].name) {
            const e =
              r *
              (1 -
                this._host.gamePage.getLimitedDR(
                  0.01 * this._host.gamePage.prestige.getBurnedParagonRatio(),
                  1
                ));
            if (this._craftManager.getValueAvailable("karma", !0) < e * Math.pow(i, t.val))
              return !1;
          } else if (this._craftManager.getValueAvailable(e[a].name, !0) < r * Math.pow(i, t.val))
            return !1;
        }
        return !0;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    i.r(e),
      i.d(e, "__extends", function () {
        return o;
      }),
      i.d(e, "__assign", function () {
        return a;
      }),
      i.d(e, "__rest", function () {
        return n;
      }),
      i.d(e, "__decorate", function () {
        return r;
      }),
      i.d(e, "__param", function () {
        return l;
      }),
      i.d(e, "__metadata", function () {
        return h;
      }),
      i.d(e, "__awaiter", function () {
        return c;
      }),
      i.d(e, "__generator", function () {
        return g;
      }),
      i.d(e, "__createBinding", function () {
        return u;
      }),
      i.d(e, "__exportStar", function () {
        return d;
      }),
      i.d(e, "__values", function () {
        return m;
      }),
      i.d(e, "__read", function () {
        return p;
      }),
      i.d(e, "__spread", function () {
        return _;
      }),
      i.d(e, "__spreadArrays", function () {
        return b;
      }),
      i.d(e, "__spreadArray", function () {
        return f;
      }),
      i.d(e, "__await", function () {
        return k;
      }),
      i.d(e, "__asyncGenerator", function () {
        return y;
      }),
      i.d(e, "__asyncDelegator", function () {
        return v;
      }),
      i.d(e, "__asyncValues", function () {
        return x;
      }),
      i.d(e, "__makeTemplateObject", function () {
        return R;
      }),
      i.d(e, "__importStar", function () {
        return w;
      }),
      i.d(e, "__importDefault", function () {
        return S;
      }),
      i.d(e, "__classPrivateFieldGet", function () {
        return $;
      }),
      i.d(e, "__classPrivateFieldSet", function () {
        return O;
      });
    /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
    var s = function (t, e) {
      return (s =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        })(t, e);
    };
    function o(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
      function i() {
        this.constructor = t;
      }
      s(t, e),
        (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
    }
    var a = function () {
      return (a =
        Object.assign ||
        function (t) {
          for (var e, i = 1, s = arguments.length; i < s; i++)
            for (var o in (e = arguments[i]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }).apply(this, arguments);
    };
    function n(t, e) {
      var i = {};
      for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) && e.indexOf(s) < 0 && (i[s] = t[s]);
      if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
        var o = 0;
        for (s = Object.getOwnPropertySymbols(t); o < s.length; o++)
          e.indexOf(s[o]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(t, s[o]) &&
            (i[s[o]] = t[s[o]]);
      }
      return i;
    }
    function r(t, e, i, s) {
      var o,
        a = arguments.length,
        n = a < 3 ? e : null === s ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, s);
      else
        for (var r = t.length - 1; r >= 0; r--)
          (o = t[r]) && (n = (a < 3 ? o(n) : a > 3 ? o(e, i, n) : o(e, i)) || n);
      return a > 3 && n && Object.defineProperty(e, i, n), n;
    }
    function l(t, e) {
      return function (i, s) {
        e(i, s, t);
      };
    }
    function h(t, e) {
      if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
        return Reflect.metadata(t, e);
    }
    function c(t, e, i, s) {
      return new (i || (i = Promise))(function (o, a) {
        function n(t) {
          try {
            l(s.next(t));
          } catch (t) {
            a(t);
          }
        }
        function r(t) {
          try {
            l(s.throw(t));
          } catch (t) {
            a(t);
          }
        }
        function l(t) {
          var e;
          t.done
            ? o(t.value)
            : ((e = t.value),
              e instanceof i
                ? e
                : new i(function (t) {
                    t(e);
                  })).then(n, r);
        }
        l((s = s.apply(t, e || [])).next());
      });
    }
    function g(t, e) {
      var i,
        s,
        o,
        a,
        n = {
          label: 0,
          sent: function () {
            if (1 & o[0]) throw o[1];
            return o[1];
          },
          trys: [],
          ops: [],
        };
      return (
        (a = { next: r(0), throw: r(1), return: r(2) }),
        "function" == typeof Symbol &&
          (a[Symbol.iterator] = function () {
            return this;
          }),
        a
      );
      function r(a) {
        return function (r) {
          return (function (a) {
            if (i) throw new TypeError("Generator is already executing.");
            for (; n; )
              try {
                if (
                  ((i = 1),
                  s &&
                    (o =
                      2 & a[0]
                        ? s.return
                        : a[0]
                        ? s.throw || ((o = s.return) && o.call(s), 0)
                        : s.next) &&
                    !(o = o.call(s, a[1])).done)
                )
                  return o;
                switch (((s = 0), o && (a = [2 & a[0], o.value]), a[0])) {
                  case 0:
                  case 1:
                    o = a;
                    break;
                  case 4:
                    return n.label++, { value: a[1], done: !1 };
                  case 5:
                    n.label++, (s = a[1]), (a = [0]);
                    continue;
                  case 7:
                    (a = n.ops.pop()), n.trys.pop();
                    continue;
                  default:
                    if (
                      !((o = n.trys),
                      (o = o.length > 0 && o[o.length - 1]) || (6 !== a[0] && 2 !== a[0]))
                    ) {
                      n = 0;
                      continue;
                    }
                    if (3 === a[0] && (!o || (a[1] > o[0] && a[1] < o[3]))) {
                      n.label = a[1];
                      break;
                    }
                    if (6 === a[0] && n.label < o[1]) {
                      (n.label = o[1]), (o = a);
                      break;
                    }
                    if (o && n.label < o[2]) {
                      (n.label = o[2]), n.ops.push(a);
                      break;
                    }
                    o[2] && n.ops.pop(), n.trys.pop();
                    continue;
                }
                a = e.call(t, n);
              } catch (t) {
                (a = [6, t]), (s = 0);
              } finally {
                i = o = 0;
              }
            if (5 & a[0]) throw a[1];
            return { value: a[0] ? a[1] : void 0, done: !0 };
          })([a, r]);
        };
      }
    }
    var u = Object.create
      ? function (t, e, i, s) {
          void 0 === s && (s = i),
            Object.defineProperty(t, s, {
              enumerable: !0,
              get: function () {
                return e[i];
              },
            });
        }
      : function (t, e, i, s) {
          void 0 === s && (s = i), (t[s] = e[i]);
        };
    function d(t, e) {
      for (var i in t) "default" === i || Object.prototype.hasOwnProperty.call(e, i) || u(e, t, i);
    }
    function m(t) {
      var e = "function" == typeof Symbol && Symbol.iterator,
        i = e && t[e],
        s = 0;
      if (i) return i.call(t);
      if (t && "number" == typeof t.length)
        return {
          next: function () {
            return t && s >= t.length && (t = void 0), { value: t && t[s++], done: !t };
          },
        };
      throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function p(t, e) {
      var i = "function" == typeof Symbol && t[Symbol.iterator];
      if (!i) return t;
      var s,
        o,
        a = i.call(t),
        n = [];
      try {
        for (; (void 0 === e || e-- > 0) && !(s = a.next()).done; ) n.push(s.value);
      } catch (t) {
        o = { error: t };
      } finally {
        try {
          s && !s.done && (i = a.return) && i.call(a);
        } finally {
          if (o) throw o.error;
        }
      }
      return n;
    }
    function _() {
      for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(p(arguments[e]));
      return t;
    }
    function b() {
      for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length;
      var s = Array(t),
        o = 0;
      for (e = 0; e < i; e++)
        for (var a = arguments[e], n = 0, r = a.length; n < r; n++, o++) s[o] = a[n];
      return s;
    }
    function f(t, e) {
      for (var i = 0, s = e.length, o = t.length; i < s; i++, o++) t[o] = e[i];
      return t;
    }
    function k(t) {
      return this instanceof k ? ((this.v = t), this) : new k(t);
    }
    function y(t, e, i) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var s,
        o = i.apply(t, e || []),
        a = [];
      return (
        (s = {}),
        n("next"),
        n("throw"),
        n("return"),
        (s[Symbol.asyncIterator] = function () {
          return this;
        }),
        s
      );
      function n(t) {
        o[t] &&
          (s[t] = function (e) {
            return new Promise(function (i, s) {
              a.push([t, e, i, s]) > 1 || r(t, e);
            });
          });
      }
      function r(t, e) {
        try {
          (i = o[t](e)).value instanceof k ? Promise.resolve(i.value.v).then(l, h) : c(a[0][2], i);
        } catch (t) {
          c(a[0][3], t);
        }
        var i;
      }
      function l(t) {
        r("next", t);
      }
      function h(t) {
        r("throw", t);
      }
      function c(t, e) {
        t(e), a.shift(), a.length && r(a[0][0], a[0][1]);
      }
    }
    function v(t) {
      var e, i;
      return (
        (e = {}),
        s("next"),
        s("throw", function (t) {
          throw t;
        }),
        s("return"),
        (e[Symbol.iterator] = function () {
          return this;
        }),
        e
      );
      function s(s, o) {
        e[s] = t[s]
          ? function (e) {
              return (i = !i) ? { value: k(t[s](e)), done: "return" === s } : o ? o(e) : e;
            }
          : o;
      }
    }
    function x(t) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var e,
        i = t[Symbol.asyncIterator];
      return i
        ? i.call(t)
        : ((t = m(t)),
          (e = {}),
          s("next"),
          s("throw"),
          s("return"),
          (e[Symbol.asyncIterator] = function () {
            return this;
          }),
          e);
      function s(i) {
        e[i] =
          t[i] &&
          function (e) {
            return new Promise(function (s, o) {
              (function (t, e, i, s) {
                Promise.resolve(s).then(function (e) {
                  t({ value: e, done: i });
                }, e);
              })(s, o, (e = t[i](e)).done, e.value);
            });
          };
      }
    }
    function R(t, e) {
      return Object.defineProperty ? Object.defineProperty(t, "raw", { value: e }) : (t.raw = e), t;
    }
    var P = Object.create
      ? function (t, e) {
          Object.defineProperty(t, "default", { enumerable: !0, value: e });
        }
      : function (t, e) {
          t.default = e;
        };
    function w(t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t)
        for (var i in t)
          "default" !== i && Object.prototype.hasOwnProperty.call(t, i) && u(e, t, i);
      return P(e, t), e;
    }
    function S(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function $(t, e, i, s) {
      if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
      if ("function" == typeof e ? t !== e || !s : !e.has(t))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it"
        );
      return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t);
    }
    function O(t, e, i, s, o) {
      if ("m" === s) throw new TypeError("Private method is not writable");
      if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
      if ("function" == typeof e ? t !== e || !o : !e.has(t))
        throw new TypeError(
          "Cannot write private member to an object whose class did not declare it"
        );
      return "a" === s ? o.call(t, i) : o ? (o.value = i) : e.set(t, i), i;
    }
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.cwarn = e.clog = e.cinfo = e.cdebug = void 0),
      (e.cdebug = function (...t) {
        console.debug("👩‍🔬", ...t);
      }),
      (e.cinfo = function (...t) {
        console.info("👩‍🔬", ...t);
      }),
      (e.clog = function (...t) {
        console.log("👩‍🔬", ...t);
      }),
      (e.cwarn = function (...t) {
        console.warn("👩‍🔬", ...t);
      });
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.Options = void 0);
    const s = i(1),
      o = i(0),
      a = i(16),
      n = i(17),
      r = i(18),
      l = i(19),
      h = i(20),
      c = i(21),
      g = i(28),
      u = i(29),
      d = i(30),
      m = i(31),
      p = i(32);
    class _ {
      constructor() {
        (this.interval = 2e3),
          (this.consume = 0.6),
          (this.auto = {
            engine: { enabled: !1 },
            build: new a.BonfireSettings(),
            space: new g.SpaceSettings(),
            craft: new n.CraftSettings(),
            unlock: new p.UnlockingSettings(),
            trade: new m.TradingSettings(),
            religion: new c.ReligionSettings(),
            time: new d.TimeSettings(),
            timeCtrl: new u.TimeControlSettings(),
            distribute: new r.DistributeSettings(),
            options: new h.OptionsSettings(),
            filters: new l.FilterSettings(),
          }),
          (this.reset = {
            reset: !1,
            times: 0,
            paragonLastTime: 0,
            paragonTotal: 0,
            karmaLastTime: 0,
            karmaTotal: 0,
          });
      }
      asLegacyOptions() {
        const t = {};
        (t.toggles = {
          build: this.auto.build.enabled,
          space: this.auto.space.enabled,
          craft: this.auto.craft.enabled,
          upgrade: this.auto.unlock.enabled,
          trade: this.auto.trade.enabled,
          faith: this.auto.religion.enabled,
          time: this.auto.time.enabled,
          timeCtrl: this.auto.timeCtrl.enabled,
          distribute: this.auto.distribute.enabled,
          options: this.auto.options.enabled,
          filter: this.auto.filters.enabled,
        }),
          (t.triggers = {
            faith: this.auto.religion.trigger,
            time: this.auto.time.trigger,
            build: this.auto.build.trigger,
            space: this.auto.space.trigger,
            craft: this.auto.craft.trigger,
            trade: this.auto.trade.trigger,
          }),
          (t.reset = {
            reset: this.reset.reset,
            times: this.reset.times,
            paragonLastTime: this.reset.paragonLastTime,
            pargonTotal: this.reset.paragonTotal,
            karmaLastTime: this.reset.karmaLastTime,
            karmaTotal: this.reset.karmaTotal,
          }),
          (t.items = {});
        for (const [e, i] of s.objectEntries(this.auto.build.items))
          (t.items["toggle-" + e] = i.enabled), (t.items[`set-${e}-max`] = i.max);
        for (const [e, i] of s.objectEntries(this.auto.craft.items))
          (t.items["toggle-" + e] = i.enabled), (t.items["toggle-limited-" + e] = i.limited);
        for (const [e, i] of s.objectEntries(this.auto.distribute.items))
          (t.items["toggle-" + e] = i.enabled),
            (t.items["toggle-limited-" + e] = i.limited),
            (t.items[`set-${e}-max`] = i.max);
        for (const [e, i] of s.objectEntries(this.auto.filters.items))
          t.items["toggle-" + e] = i.enabled;
        for (const [e, i] of s.objectEntries(this.auto.options.items))
          (t.items["toggle-" + e] = i.enabled), (t.items[`set-${e}-subTrigger`] = i.subTrigger);
        for (const [e, i] of s.objectEntries(this.auto.religion.items))
          t.items["toggle-" + e] = i.enabled;
        for (const [e, i] of s.objectEntries(this.auto.space.items))
          (t.items["toggle-" + e] = i.enabled), (t.items[`set-${e}-max`] = i.max);
        (t.items["toggle-accelerateTime"] = this.auto.timeCtrl.items.accelerateTime.enabled),
          (t.items["set-accelerateTime-subTrigger"] =
            this.auto.timeCtrl.items.accelerateTime.subTrigger),
          (t.items["toggle-reset"] = this.auto.timeCtrl.items.reset.enabled),
          (t.items["toggle-timeSkip"] = this.auto.timeCtrl.items.timeSkip.enabled),
          (t.items["set-timeSkip-subTrigger"] = this.auto.timeCtrl.items.timeSkip.subTrigger),
          (t.items["toggle-timeSkip-autumn"] = this.auto.timeCtrl.items.timeSkip.autumn),
          (t.items["toggle-timeSkip-spring"] = this.auto.timeCtrl.items.timeSkip.spring),
          (t.items["toggle-timeSkip-summer"] = this.auto.timeCtrl.items.timeSkip.summer),
          (t.items["toggle-timeSkip-winter"] = this.auto.timeCtrl.items.timeSkip.winter);
        for (let e = 0; e < 10; ++e)
          t.items["toggle-timeSkip-" + e] = this.auto.timeCtrl.items.timeSkip[e];
        for (const [e, i] of s.objectEntries(this.auto.timeCtrl.buildItems))
          (t.items["toggle-reset-build-" + e] = i.checkForReset),
            (t.items[`set-reset-build-${e}-min`] = i.triggerForReset);
        for (const [e, i] of s.objectEntries(this.auto.timeCtrl.religionItems))
          (t.items["toggle-reset-faith-" + e] = i.checkForReset),
            (t.items[`set-reset-faith-${e}-min`] = i.triggerForReset);
        for (const [e, i] of s.objectEntries(this.auto.timeCtrl.spaceItems))
          (t.items["toggle-reset-space-" + e] = i.checkForReset),
            (t.items[`set-reset-space-${e}-min`] = i.triggerForReset);
        for (const [e, i] of s.objectEntries(this.auto.timeCtrl.timeItems))
          (t.items["toggle-reset-time-" + e] = i.checkForReset),
            (t.items[`set-reset-time-${e}-min`] = i.triggerForReset);
        for (const [e, i] of s.objectEntries(this.auto.trade.items))
          (t.items["toggle-" + e] = i.enabled),
            (t.items["toggle-limited-" + e] = i.limited),
            (t.items[`toggle-${e}-autumn`] = i.autumn),
            (t.items[`toggle-${e}-spring`] = i.spring),
            (t.items[`toggle-${e}-summer`] = i.summer),
            (t.items[`toggle-${e}-winter`] = i.winter);
        for (const [e, i] of s.objectEntries(this.auto.unlock.items))
          t.items["toggle-" + e] = i.enabled;
        t.resources = {};
        for (const [e, i] of s.objectEntries(this.auto.craft.resources))
          t.resources[e] = {
            checkForReset: !1,
            stockForReset: 0,
            consume: i.consume,
            enabled: i.enabled,
            stock: i.stock,
          };
        for (const [e, i] of s.objectEntries(this.auto.timeCtrl.resources))
          t.resources[e] = {
            checkForReset: i.checkForReset,
            stockForReset: i.stockForReset,
            consume: 0,
            enabled: !1,
            stock: 0,
          };
        return t;
      }
      static parseLegacyOptions(t) {
        var e,
          i,
          a,
          n,
          r,
          l,
          h,
          c,
          g,
          u,
          d,
          m,
          p,
          b,
          f,
          k,
          y,
          v,
          x,
          R,
          P,
          w,
          S,
          $,
          O,
          F,
          E,
          T,
          C,
          B,
          M,
          U,
          I,
          V,
          j,
          L,
          A,
          q,
          D,
          z,
          N,
          H,
          G,
          W,
          K,
          Z,
          J,
          X;
        const Y = new _();
        if (o.isNil(t)) return Y;
        const Q = t;
        (Y.auto.build.enabled = Q.toggles.build),
          (Y.auto.space.enabled = Q.toggles.space),
          (Y.auto.craft.enabled = Q.toggles.craft),
          (Y.auto.unlock.enabled = Q.toggles.upgrade),
          (Y.auto.trade.enabled = Q.toggles.trade),
          (Y.auto.religion.enabled = Q.toggles.faith),
          (Y.auto.time.enabled = Q.toggles.time),
          (Y.auto.timeCtrl.enabled = Q.toggles.timeCtrl),
          (Y.auto.distribute.enabled = Q.toggles.distribute),
          (Y.auto.options.enabled = Q.toggles.options),
          (Y.auto.filters.enabled = Q.toggles.filter),
          (Y.auto.religion.trigger = Q.triggers.faith),
          (Y.auto.time.trigger = Q.triggers.time),
          (Y.auto.build.trigger = Q.triggers.build),
          (Y.auto.space.trigger = Q.triggers.space),
          (Y.auto.craft.trigger = Q.triggers.craft),
          (Y.auto.trade.trigger = Q.triggers.trade),
          (Y.reset.reset = Q.reset.reset),
          (Y.reset.times = Q.reset.times),
          (Y.reset.paragonLastTime = Q.reset.paragonLastTime),
          (Y.reset.paragonTotal = Q.reset.pargonTotal),
          (Y.reset.karmaLastTime = Q.reset.karmaLastTime),
          (Y.reset.karmaTotal = Q.reset.karmaTotal);
        for (const [t, o] of s.objectEntries(Y.auto.build.items))
          (o.enabled = null !== (e = Q.items["toggle-" + t]) && void 0 !== e ? e : o.enabled),
            (o.max = null !== (i = Q.items[`set-${t}-max`]) && void 0 !== i ? i : o.max);
        for (const [t, e] of s.objectEntries(Y.auto.craft.items))
          (e.enabled = null !== (a = Q.items["toggle-" + t]) && void 0 !== a ? a : e.enabled),
            (e.limited =
              null !== (n = Q.items["toggle-limited-" + t]) && void 0 !== n ? n : e.limited);
        for (const [t, e] of s.objectEntries(Y.auto.distribute.items))
          (e.enabled = null !== (r = Q.items["toggle-" + t]) && void 0 !== r ? r : e.enabled),
            (e.limited =
              null !== (l = Q.items["toggle-limited-" + t]) && void 0 !== l ? l : e.limited),
            (e.max = null !== (h = Q.items[`set-${t}-max`]) && void 0 !== h ? h : e.max);
        for (const [t, e] of s.objectEntries(Y.auto.filters.items))
          e.enabled = null !== (c = Q.items["toggle-" + t]) && void 0 !== c ? c : e.enabled;
        for (const [t, e] of s.objectEntries(Y.auto.options.items))
          (e.enabled = null !== (g = Q.items["toggle-" + t]) && void 0 !== g ? g : e.enabled),
            (e.subTrigger =
              null !== (u = Q.items[`set-${t}-subTrigger`]) && void 0 !== u ? u : e.subTrigger);
        for (const [t, e] of s.objectEntries(Y.auto.religion.items))
          e.enabled = null !== (d = Q.items["toggle-" + t]) && void 0 !== d ? d : e.enabled;
        for (const [t, e] of s.objectEntries(Y.auto.space.items))
          (e.enabled = null !== (m = Q.items["toggle-" + t]) && void 0 !== m ? m : e.enabled),
            (e.max = null !== (p = Q.items[`set-${t}-max`]) && void 0 !== p ? p : e.max);
        (Y.auto.religion.addition.adore.enabled =
          null !== (b = Q.items["toggle-adore"]) && void 0 !== b
            ? b
            : Y.auto.religion.addition.adore.enabled),
          (Y.auto.religion.addition.autoPraise.enabled =
            null !== (f = Q.items["toggle-autoPraise"]) && void 0 !== f
              ? f
              : Y.auto.religion.addition.autoPraise.enabled),
          (Y.auto.religion.addition.bestUnicornBuilding.enabled =
            null !== (k = Q.items["toggle-bestUnicornBuilding"]) && void 0 !== k
              ? k
              : Y.auto.religion.addition.bestUnicornBuilding.enabled),
          (Y.auto.religion.addition.transcend.enabled =
            null !== (y = Q.items["toggle-transcend"]) && void 0 !== y
              ? y
              : Y.auto.religion.addition.transcend.enabled),
          (Y.auto.religion.addition.adore.subTrigger =
            null !== (v = Q.items["set-adore-subTrigger"]) && void 0 !== v
              ? v
              : Y.auto.religion.addition.adore.subTrigger),
          (Y.auto.religion.addition.autoPraise.subTrigger =
            null !== (x = Q.items["set-autoPraise-subTrigger"]) && void 0 !== x
              ? x
              : Y.auto.religion.addition.autoPraise.subTrigger);
        for (const [t, e] of s.objectEntries(Y.auto.space.items))
          (e.enabled = null !== (R = Q.items["toggle-" + t]) && void 0 !== R ? R : e.enabled),
            (e.max = null !== (P = Q.items[`set-${t}-max`]) && void 0 !== P ? P : e.max);
        for (const [t, e] of s.objectEntries(Y.auto.time.items))
          e.enabled = null !== (w = Q.items["toggle-" + t]) && void 0 !== w ? w : e.enabled;
        for (const [t, e] of s.objectEntries(Y.auto.timeCtrl.items))
          e.enabled = null !== (S = Q.items["toggle-" + t]) && void 0 !== S ? S : e.enabled;
        (Y.auto.timeCtrl.items.accelerateTime.enabled =
          null !== ($ = Q.items["toggle-accelerateTime"]) && void 0 !== $
            ? $
            : Y.auto.timeCtrl.items.accelerateTime.enabled),
          (Y.auto.timeCtrl.items.accelerateTime.subTrigger =
            null !== (O = Q.items["set-accelerateTime-subTrigger"]) && void 0 !== O
              ? O
              : Y.auto.timeCtrl.items.accelerateTime.subTrigger),
          (Y.auto.timeCtrl.items.reset.enabled =
            null !== (F = Q.items["toggle-reset"]) && void 0 !== F
              ? F
              : Y.auto.timeCtrl.items.reset.enabled),
          (Y.auto.timeCtrl.items.timeSkip.enabled =
            null !== (E = Q.items["toggle-timeSkip"]) && void 0 !== E
              ? E
              : Y.auto.timeCtrl.items.timeSkip.enabled),
          (Y.auto.timeCtrl.items.timeSkip.subTrigger =
            null !== (T = Q.items["set-timeSkip-subTrigger"]) && void 0 !== T
              ? T
              : Y.auto.timeCtrl.items.timeSkip.subTrigger),
          (Y.auto.timeCtrl.items.timeSkip.autumn =
            null !== (C = Q.items["toggle-timeSkip-autumn"]) && void 0 !== C
              ? C
              : Y.auto.timeCtrl.items.timeSkip.autumn),
          (Y.auto.timeCtrl.items.timeSkip.spring =
            null !== (B = Q.items["toggle-timeSkip-spring"]) && void 0 !== B
              ? B
              : Y.auto.timeCtrl.items.timeSkip.spring),
          (Y.auto.timeCtrl.items.timeSkip.summer =
            null !== (M = Q.items["toggle-timeSkip-summer"]) && void 0 !== M
              ? M
              : Y.auto.timeCtrl.items.timeSkip.summer),
          (Y.auto.timeCtrl.items.timeSkip.winter =
            null !== (U = Q.items["toggle-timeSkip-winter"]) && void 0 !== U
              ? U
              : Y.auto.timeCtrl.items.timeSkip.winter);
        for (let t = 0; t < 10; ++t)
          Y.auto.timeCtrl.items.timeSkip[t] =
            null !== (I = Q.items["toggle-timeSkip-" + t]) && void 0 !== I
              ? I
              : Y.auto.timeCtrl.items.timeSkip[t];
        for (const [t, e] of s.objectEntries(Y.auto.timeCtrl.buildItems))
          (e.checkForReset =
            null !== (V = Q.items["toggle-reset-build-" + t]) && void 0 !== V
              ? V
              : e.checkForReset),
            (e.triggerForReset =
              null !== (j = Q.items[`set-reset-build-${t}-min`]) && void 0 !== j
                ? j
                : e.triggerForReset);
        for (const [t, e] of s.objectEntries(Y.auto.timeCtrl.religionItems))
          (e.checkForReset =
            null !== (L = Q.items["toggle-reset-faith-" + t]) && void 0 !== L
              ? L
              : e.checkForReset),
            (e.triggerForReset =
              null !== (A = Q.items[`set-reset-faith-${t}-min`]) && void 0 !== A
                ? A
                : e.triggerForReset);
        for (const [t, e] of s.objectEntries(Y.auto.timeCtrl.spaceItems))
          (e.checkForReset =
            null !== (q = Q.items["toggle-reset-space-" + t]) && void 0 !== q
              ? q
              : e.checkForReset),
            (e.triggerForReset =
              null !== (D = Q.items[`set-reset-space-${t}-min`]) && void 0 !== D
                ? D
                : e.triggerForReset);
        for (const [t, e] of s.objectEntries(Y.auto.timeCtrl.timeItems))
          (e.checkForReset =
            null !== (z = Q.items["toggle-reset-time-" + t]) && void 0 !== z ? z : e.checkForReset),
            (e.triggerForReset =
              null !== (N = Q.items[`set-reset-time-${t}-min`]) && void 0 !== N
                ? N
                : e.triggerForReset);
        for (const [t, e] of s.objectEntries(Y.auto.trade.items))
          (e.enabled = null !== (H = Q.items["toggle-" + t]) && void 0 !== H ? H : e.enabled),
            (e.limited =
              null !== (G = Q.items["toggle-limited-" + t]) && void 0 !== G ? G : e.limited),
            (e.autumn =
              null !== (W = Q.items[`toggle-${t}-autumn`]) && void 0 !== W ? W : e.autumn),
            (e.spring =
              null !== (K = Q.items[`toggle-${t}-spring`]) && void 0 !== K ? K : e.spring),
            (e.summer =
              null !== (Z = Q.items[`toggle-${t}-summer`]) && void 0 !== Z ? Z : e.summer),
            (e.winter =
              null !== (J = Q.items[`toggle-${t}-winter`]) && void 0 !== J ? J : e.winter);
        for (const [t, e] of s.objectEntries(Y.auto.unlock.items))
          e.enabled = null !== (X = Q.items["toggle-" + t]) && void 0 !== X ? X : e.enabled;
        (Y.auto.craft.resources = {}), (Y.auto.timeCtrl.resources = {});
        for (const [t, e] of s.objectEntries(Q.resources))
          e.checkForReset
            ? (Y.auto.timeCtrl.resources[t] = {
                checkForReset: e.checkForReset,
                stockForReset: e.stockForReset,
              })
            : (Y.auto.craft.resources[t] = {
                consume: e.consume,
                enabled: e.enabled,
                stock: e.stock,
              });
        return Y;
      }
    }
    e.Options = _;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.SettingsStorage = void 0);
    e.SettingsStorage = class {
      static getLegacySettings() {
        const t = JSON.parse(localStorage["cbc.kitten-scientists"] || "null");
        return null === t ? null : t;
      }
      static setLegacySettings(t) {
        localStorage["cbc.kitten-scientists"] = JSON.stringify(t);
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.CacheManager = void 0);
    const s = i(1);
    e.CacheManager = class {
      constructor(t) {
        (this._cache = new Array()), (this._cacheSum = {}), (this._host = t);
      }
      pushToCache(t) {
        this._cache.push(t);
        for (const [e, i] of s.objectEntries(t.materials))
          this._cacheSum[e] || (this._cacheSum[e] = 0), (this._cacheSum[e] += i);
        for (let t = 0; t < this._cache.length; ++t) {
          const e = this._cache[t];
          if (!(this._cache.length > 1e4)) return;
          {
            const i = e.materials;
            for (const [t, e] of s.objectEntries(i))
              this._cacheSum[t] || (this._cacheSum[t] = 0), (this._cacheSum[t] -= e);
            this._cache.shift(), t--;
          }
        }
      }
      getResValue(t) {
        if (0 === this._cache.length || !this._cacheSum[t]) return 0;
        const e = this._host.gamePage.timer.ticksTotal,
          i = this._cache[0].timeStamp;
        return this._cacheSum[t] / (e - i);
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    const s = i(9).__importDefault(i(15)),
      o = i(11),
      a = i(12),
      n = i(10),
      r = i(33);
    (async () => {
      await r.UserScript.waitForGame();
      const t = await r.UserScript.getDefaultInstance();
      (window.kittenScientists = t), n.cinfo("Looking for legacy settings...");
      null === a.SettingsStorage.getLegacySettings() &&
        n.cinfo("No legacy settings found. Default settings will be used.");
      const e = o.Options.parseLegacyOptions(s.default);
      t.injectOptions(e), t.run();
    })();
  },
  function (t) {
    t.exports = JSON.parse(
      '{"version":2,"toggles":{"build":true,"space":true,"craft":true,"upgrade":true,"trade":true,"faith":true,"time":false,"timeCtrl":true,"distribute":true,"options":true,"filter":true},"items":{"toggle-unicornTomb":true,"toggle-ivoryTower":true,"toggle-ivoryCitadel":true,"toggle-skyPalace":true,"toggle-unicornUtopia":true,"toggle-sunspire":true,"toggle-marker":true,"toggle-blackPyramid":true,"toggle-unicornNecropolis":true,"toggle-unicornGraveyard":true,"toggle-apocripha":true,"toggle-blackNexus":true,"toggle-blackObelisk":true,"toggle-blackCore":true,"toggle-singularity":true,"toggle-blackLibrary":true,"toggle-blackRadiance":true,"toggle-blazar":true,"toggle-darkNova":true,"toggle-huntFilter":true,"toggle-eludium":false,"toggle-craftFilter":true,"toggle-hut":true,"toggle-logHouse":true,"toggle-mansion":true,"toggle-workshop":true,"toggle-factory":true,"toggle-field":true,"toggle-pasture":false,"toggle-solarFarm":true,"toggle-mine":true,"toggle-lumberMill":true,"toggle-aqueduct":false,"toggle-hydroPlant":true,"toggle-oilWell":true,"toggle-quarry":true,"toggle-smelter":true,"toggle-biolab":true,"toggle-calciner":true,"toggle-reactor":true,"toggle-accelerator":true,"toggle-steamworks":true,"toggle-magneto":true,"toggle-library":true,"toggle-dataCenter":true,"toggle-academy":true,"toggle-observatory":true,"toggle-amphitheatre":false,"toggle-broadcastTower":true,"toggle-tradepost":true,"toggle-chapel":true,"toggle-temple":true,"toggle-mint":true,"toggle-ziggurat":true,"toggle-chronosphere":true,"toggle-aiCore":true,"toggle-brewery":true,"toggle-barn":true,"toggle-harbor":true,"toggle-warehouse":true,"toggle-praiseFilter":true,"toggle-festivalFilter":true,"toggle-tradeFilter":true,"toggle-style":true,"set-steamworks-max":100,"set-magneto-max":100,"set-quarry-max":100,"set-harbor-max":250,"set-warehouse-max":250,"set-chronosphere-max":50,"set-dataCenter-max":100,"set-woodcutter-max":10,"set-farmer-max":10,"set-scholar-max":10,"set-hunter-max":10,"set-miner-max":10,"set-geologist-max":100,"toggle-engineer":false,"set-priest-max":1,"set-observatory-max":150,"set-biolab-max":600,"toggle-sattelite":true,"toggle-spaceElevator":true,"toggle-spaceStation":true,"toggle-moonOutpost":true,"toggle-moonBase":true,"toggle-planetCracker":true,"toggle-hydrofracturer":true,"toggle-spiceRefinery":true,"toggle-researchVessel":true,"toggle-orbitalArray":true,"toggle-sunlifter":true,"toggle-limited-woodcutter":true,"toggle-limited-farmer":true,"toggle-limited-scholar":true,"toggle-limited-hunter":true,"toggle-limited-miner":true,"toggle-limited-priest":false,"toggle-limited-geologist":true,"toggle-limited-engineer":true,"set-orbitalArray-max":40,"toggle-tectonic":true,"toggle-moltenCore":true,"toggle-terraformingStation":true,"toggle-spaceBeacon":true,"toggle-ship":true,"toggle-unicornPasture":true,"toggle-bestUnicornBuilding":true,"toggle-reset-space-hydrofracturer":false,"toggle-reset-space-spiceRefinery":false,"toggle-reset-space-researchVessel":false,"set-reset-space-cryostation-min":5,"toggle-reset-time-blastFurnace":false,"set-reset-time-voidHoover-min":4,"toggle-reset-build-factory":false,"toggle-reset-build-aqueduct":false,"set-reset-build-steamworks-min":99,"toggle-reset-faith-solarchant":false,"set-reset-faith-blackLibrary-min":7,"toggle-timeSkip-0":true,"toggle-timeSkip-1":true},"resources":{"wood":{"enabled":true,"stock":1000,"checkForReset":false,"stockForReset":null},"minerals":{"enabled":true,"stock":1000,"checkForReset":false,"stockForReset":null},"furs":{"enabled":true,"stock":1000,"checkForReset":false,"stockForReset":null},"timeCrystal":{"enabled":false,"stock":0,"checkForReset":true,"stockForReset":500000}},"triggers":{"faith":0,"time":0,"build":0,"space":0,"craft":0.95,"trade":0.98},"reset":{"reset":false,"times":0,"paragonLastTime":0,"pargonTotal":0,"karmaLastTime":0,"karmaTotal":0}}'
    );
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.BonfireSettings = void 0);
    const s = i(4);
    class o extends s.SettingsSection {
      constructor() {
        super(...arguments),
          (this.trigger = 0),
          (this.items = {
            hut: { enabled: !1, max: -1, require: "wood" },
            logHouse: { enabled: !1, max: -1, require: "minerals" },
            mansion: { enabled: !1, max: -1, require: "titanium" },
            workshop: { enabled: !0, max: -1, require: "minerals" },
            factory: { enabled: !0, max: -1, require: "titanium" },
            field: { enabled: !0, max: -1, require: "catnip" },
            pasture: { enabled: !0, max: -1, stage: 0, require: "catnip" },
            solarFarm: { enabled: !0, max: -1, stage: 1, name: "pasture", require: "titanium" },
            mine: { enabled: !0, max: -1, require: "wood" },
            lumberMill: { enabled: !0, max: -1, require: "minerals" },
            aqueduct: { enabled: !0, max: -1, stage: 0, require: "minerals" },
            hydroPlant: { enabled: !0, max: -1, stage: 1, name: "aqueduct", require: "titanium" },
            oilWell: { enabled: !0, max: -1, require: "coal" },
            quarry: { enabled: !0, max: -1, require: "coal" },
            smelter: { enabled: !0, max: -1, require: "minerals" },
            biolab: { enabled: !1, max: -1, require: "science" },
            calciner: { enabled: !1, max: -1, require: "titanium" },
            reactor: { enabled: !1, max: -1, require: "titanium" },
            accelerator: { enabled: !1, max: -1, require: "titanium" },
            steamworks: { enabled: !1, max: -1, require: !1 },
            magneto: { enabled: !1, max: -1, require: !1 },
            library: { enabled: !0, max: -1, stage: 0, require: "wood" },
            dataCenter: { enabled: !0, max: -1, stage: 1, name: "library", require: !1 },
            academy: { enabled: !0, max: -1, require: "wood" },
            observatory: { enabled: !0, max: -1, require: "iron" },
            amphitheatre: { enabled: !0, max: -1, stage: 0, require: "minerals" },
            broadcastTower: {
              enabled: !0,
              max: -1,
              stage: 1,
              name: "amphitheatre",
              require: "titanium",
            },
            tradepost: { enabled: !0, max: -1, require: "gold" },
            chapel: { enabled: !0, max: -1, require: "minerals" },
            temple: { enabled: !0, max: -1, require: "gold" },
            mint: { enabled: !1, max: -1, require: !1 },
            ziggurat: { enabled: !0, max: -1, require: !1 },
            chronosphere: { enabled: !0, max: -1, require: "unobtainium" },
            aiCore: { enabled: !1, max: -1, require: !1 },
            brewery: { enabled: !1, max: -1, require: !1 },
            barn: { enabled: !0, max: -1, require: "wood" },
            harbor: { enabled: !1, max: -1, require: !1 },
            warehouse: { enabled: !1, max: -1, require: !1 },
            zebraOutpost: { enabled: !0, max: -1, require: "bloodstone" },
            zebraWorkshop: { enabled: !1, max: -1, require: "bloodstone" },
            zebraForge: { enabled: !1, max: -1, require: "bloodstone" },
          });
      }
    }
    e.BonfireSettings = o;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.CraftSettings = void 0);
    const s = i(4);
    class o extends s.SettingsSection {
      constructor() {
        super(...arguments),
          (this.trigger = 0.95),
          (this.items = {
            wood: { enabled: !0, limited: !0, require: "catnip", limRat: 0.5, max: 0 },
            beam: { enabled: !0, limited: !0, require: "wood", limRat: 0.5, max: 0 },
            slab: { enabled: !0, limited: !0, require: "minerals", limRat: 0.5, max: 0 },
            steel: { enabled: !0, limited: !0, require: "coal", limRat: 0.5, max: 0 },
            plate: { enabled: !0, limited: !0, require: "iron", limRat: 0.5, max: 0 },
            alloy: { enabled: !0, limited: !0, require: "titanium", limRat: 0.5, max: 0 },
            concrate: { enabled: !0, limited: !0, require: !1, limRat: 0.5, max: 0 },
            gear: { enabled: !0, limited: !0, require: !1, limRat: 0.5, max: 0 },
            scaffold: { enabled: !0, limited: !0, require: !1, limRat: 0.5, max: 0 },
            ship: { enabled: !0, limited: !0, require: !1, limRat: 0.5, max: 0 },
            tanker: { enabled: !0, limited: !0, require: !1, limRat: 0.5, max: 0 },
            parchment: { enabled: !0, limited: !1, require: !1, limRat: 0.5, max: 0 },
            manuscript: { enabled: !0, limited: !0, require: "culture", limRat: 0.5, max: 0 },
            compedium: { enabled: !0, limited: !0, require: "science", limRat: 0.5, max: 0 },
            blueprint: { enabled: !0, limited: !0, require: "science", limRat: 0.5, max: 0 },
            kerosene: { enabled: !0, limited: !0, require: "oil", limRat: 0.5, max: 0 },
            megalith: { enabled: !0, limited: !0, require: !1, limRat: 0.5, max: 0 },
            eludium: { enabled: !0, limited: !0, require: "unobtainium", limRat: 0.5, max: 0 },
            thorium: { enabled: !0, limited: !0, require: "uranium", limRat: 0.5, max: 0 },
          }),
          (this.resources = { furs: { enabled: !0, stock: 1e3 } });
      }
    }
    e.CraftSettings = o;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.DistributeSettings = void 0);
    const s = i(4);
    class o extends s.SettingsSection {
      constructor() {
        super(...arguments),
          (this.items = {
            woodcutter: { enabled: !0, limited: !0, max: 1 },
            farmer: { enabled: !0, limited: !0, max: 1 },
            scholar: { enabled: !0, limited: !0, max: 1 },
            hunter: { enabled: !0, limited: !0, max: 1 },
            miner: { enabled: !0, limited: !0, max: 1 },
            priest: { enabled: !0, limited: !0, max: 1 },
            geologist: { enabled: !0, limited: !0, max: 1 },
            engineer: { enabled: !0, limited: !0, max: 1 },
          });
      }
    }
    e.DistributeSettings = o;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.FilterSettings = e.FilterItemVariant = void 0);
    const s = i(4);
    var o;
    !(function (t) {
      (t.Build = "ks-activity type_ks-build"),
        (t.Craft = "ks-activity type_ks-craft"),
        (t.Upgrade = "ks-activity type_ks-upgrade"),
        (t.Research = "ks-activity type_ks-research"),
        (t.Trade = "ks-activity type_ks-trade"),
        (t.Hunt = "ks-activity type_ks-hunt"),
        (t.Praise = "ks-activity type_ks-praise"),
        (t.Adore = "ks-activity type_ks-adore"),
        (t.Transcend = "ks-activity type_ks-transcend"),
        (t.Faith = "ks-activity type_ks-faith"),
        (t.Accelerate = "ks-activity type_ks-accelerate"),
        (t.TimeSkip = "ks-activity type_ks-timeSkip"),
        (t.Festival = "ks-activity type_ks-festival"),
        (t.Star = "ks-activity type_ks-star"),
        (t.Distribute = "ks-activity type_ks-distribute"),
        (t.Promote = "ks-activity type_ks-promote"),
        (t.Misc = "ks-activity");
    })((o = e.FilterItemVariant || (e.FilterItemVariant = {})));
    class a extends s.SettingsSection {
      constructor() {
        super(...arguments),
          (this.items = {
            buildFilter: { enabled: !1, variant: o.Build },
            craftFilter: { enabled: !1, variant: o.Craft },
            upgradeFilter: { enabled: !1, variant: o.Upgrade },
            researchFilter: { enabled: !1, variant: o.Research },
            tradeFilter: { enabled: !1, variant: o.Trade },
            huntFilter: { enabled: !1, variant: o.Hunt },
            praiseFilter: { enabled: !1, variant: o.Praise },
            adoreFilter: { enabled: !1, variant: o.Adore },
            transcendFilter: { enabled: !1, variant: o.Transcend },
            faithFilter: { enabled: !1, variant: o.Faith },
            accelerateFilter: { enabled: !1, variant: o.Accelerate },
            timeSkipFilter: { enabled: !1, variant: o.TimeSkip },
            festivalFilter: { enabled: !1, variant: o.Festival },
            starFilter: { enabled: !1, variant: o.Star },
            distributeFilter: { enabled: !1, variant: o.Distribute },
            promoteFilter: { enabled: !1, variant: o.Promote },
            miscFilter: { enabled: !1, variant: o.Misc },
          });
      }
    }
    e.FilterSettings = a;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.OptionsSettings = void 0);
    const s = i(4);
    class o extends s.SettingsSection {
      constructor() {
        super(...arguments),
          (this.items = {
            observe: { enabled: !0 },
            festival: { enabled: !0 },
            shipOverride: { enabled: !0 },
            autofeed: { enabled: !0 },
            hunt: { enabled: !0, subTrigger: 0.98 },
            promote: { enabled: !0 },
            crypto: { enabled: !0, subTrigger: 1e4 },
            fixCry: { enabled: !1 },
            buildEmbassies: { enabled: !0, subTrigger: 0.9 },
            style: { enabled: !0 },
            _steamworks: { enabled: !1 },
          });
      }
    }
    e.OptionsSettings = o;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.ReligionSettings = void 0);
    const s = i(6),
      o = i(4);
    class a extends o.SettingsSection {
      constructor() {
        super(...arguments),
          (this.trigger = 0),
          (this.addition = {
            bestUnicornBuilding: { enabled: !0 },
            autoPraise: { enabled: !0, subTrigger: 0.98 },
            adore: { enabled: !1, subTrigger: 0.75 },
            transcend: { enabled: !1 },
          }),
          (this.items = {
            unicornPasture: { enabled: !0, variant: s.UnicornItemVariant.Unknown_zp, require: !1 },
            unicornTomb: { enabled: !1, variant: s.UnicornItemVariant.Ziggurat, require: !1 },
            ivoryTower: { enabled: !1, variant: s.UnicornItemVariant.Ziggurat, require: !1 },
            ivoryCitadel: { enabled: !1, variant: s.UnicornItemVariant.Ziggurat, require: !1 },
            skyPalace: { enabled: !1, variant: s.UnicornItemVariant.Ziggurat, require: !1 },
            unicornUtopia: { enabled: !1, variant: s.UnicornItemVariant.Ziggurat, require: "gold" },
            sunspire: { enabled: !1, variant: s.UnicornItemVariant.Ziggurat, require: "gold" },
            marker: { enabled: !1, variant: s.UnicornItemVariant.Ziggurat, require: "unobtainium" },
            unicornGraveyard: { enabled: !1, variant: s.UnicornItemVariant.Ziggurat, require: !1 },
            unicornNecropolis: { enabled: !1, variant: s.UnicornItemVariant.Ziggurat, require: !1 },
            blackPyramid: {
              enabled: !1,
              variant: s.UnicornItemVariant.Ziggurat,
              require: "unobtainium",
            },
            solarchant: {
              enabled: !0,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            scholasticism: {
              enabled: !0,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            goldenSpire: {
              enabled: !0,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            sunAltar: {
              enabled: !0,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            stainedGlass: {
              enabled: !0,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            solarRevolution: {
              enabled: !0,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            basilica: {
              enabled: !0,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            templars: {
              enabled: !0,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            apocripha: {
              enabled: !1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            transcendence: {
              enabled: !0,
              variant: s.UnicornItemVariant.OrderOfTheSun,
              require: "faith",
            },
            blackObelisk: {
              enabled: !1,
              variant: s.UnicornItemVariant.Cryptotheology,
              require: !1,
            },
            blackNexus: { enabled: !1, variant: s.UnicornItemVariant.Cryptotheology, require: !1 },
            blackCore: { enabled: !1, variant: s.UnicornItemVariant.Cryptotheology, require: !1 },
            singularity: { enabled: !1, variant: s.UnicornItemVariant.Cryptotheology, require: !1 },
            blackLibrary: {
              enabled: !1,
              variant: s.UnicornItemVariant.Cryptotheology,
              require: !1,
            },
            blackRadiance: {
              enabled: !1,
              variant: s.UnicornItemVariant.Cryptotheology,
              require: !1,
            },
            blazar: { enabled: !1, variant: s.UnicornItemVariant.Cryptotheology, require: !1 },
            darkNova: { enabled: !1, variant: s.UnicornItemVariant.Cryptotheology, require: !1 },
            holyGenocide: {
              enabled: !1,
              variant: s.UnicornItemVariant.Cryptotheology,
              require: !1,
            },
          });
      }
    }
    e.ReligionSettings = a;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.UnicornItemVariant = void 0),
      (function (t) {
        (t.Cryptotheology = "c"),
          (t.OrderOfTheSun = "s"),
          (t.Ziggurat = "z"),
          (t.Unknown_zp = "zp");
      })(e.UnicornItemVariant || (e.UnicornItemVariant = {}));
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.TimeItemVariant = void 0),
      (function (t) {
        (t.Chronoforge = "chrono"), (t.VoidSpace = "void");
      })(e.TimeItemVariant || (e.TimeItemVariant = {}));
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.SpaceSettings = void 0);
    const s = i(4);
    class o extends s.SettingsSection {
      constructor() {
        super(...arguments),
          (this.trigger = 0),
          (this.items = {
            spaceElevator: { enabled: !1, max: -1 },
            sattelite: { enabled: !1, max: -1 },
            spaceStation: { enabled: !1, max: -1 },
            moonOutpost: { enabled: !1, max: -1 },
            moonBase: { enabled: !1, max: -1 },
            planetCracker: { enabled: !1, max: -1 },
            hydrofracturer: { enabled: !1, max: -1 },
            spiceRefinery: { enabled: !1, max: -1 },
            researchVessel: { enabled: !1, max: -1 },
            orbitalArray: { enabled: !1, max: -1 },
            sunlifter: { enabled: !1, max: -1 },
            containmentChamber: { enabled: !1, max: -1 },
            heatsink: { enabled: !1, max: -1 },
            sunforge: { enabled: !1, max: -1 },
            cryostation: { enabled: !1, max: -1 },
            spaceBeacon: { enabled: !1, max: -1 },
            terraformingStation: { enabled: !1, max: -1 },
            hydroponics: { enabled: !1, max: -1 },
            hrHarvester: { enabled: !1, max: -1 },
            entangler: { enabled: !1, max: -1 },
            tectonic: { enabled: !1, max: -1 },
            moltenCore: { enabled: !1, max: -1 },
          });
      }
    }
    e.SpaceSettings = o;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.TimeControlSettings = void 0);
    const s = i(6),
      o = i(4);
    class a extends o.SettingsSection {
      constructor() {
        super(...arguments),
          (this.buildItems = {
            hut: { checkForReset: !0, triggerForReset: -1 },
            logHouse: { checkForReset: !0, triggerForReset: -1 },
            mansion: { checkForReset: !0, triggerForReset: -1 },
            workshop: { checkForReset: !0, triggerForReset: -1 },
            factory: { checkForReset: !0, triggerForReset: -1 },
            field: { checkForReset: !0, triggerForReset: -1 },
            pasture: { checkForReset: !0, triggerForReset: -1 },
            solarFarm: { checkForReset: !0, triggerForReset: -1 },
            mine: { checkForReset: !0, triggerForReset: -1 },
            lumberMill: { checkForReset: !0, triggerForReset: -1 },
            aqueduct: { checkForReset: !0, triggerForReset: -1 },
            hydroPlant: { checkForReset: !0, triggerForReset: -1 },
            oilWell: { checkForReset: !0, triggerForReset: -1 },
            quarry: { checkForReset: !0, triggerForReset: -1 },
            smelter: { checkForReset: !0, triggerForReset: -1 },
            biolab: { checkForReset: !0, triggerForReset: -1 },
            calciner: { checkForReset: !0, triggerForReset: -1 },
            reactor: { checkForReset: !0, triggerForReset: -1 },
            accelerator: { checkForReset: !0, triggerForReset: -1 },
            steamworks: { checkForReset: !0, triggerForReset: -1 },
            magneto: { checkForReset: !0, triggerForReset: -1 },
            library: { checkForReset: !0, triggerForReset: -1 },
            dataCenter: { checkForReset: !0, triggerForReset: -1 },
            academy: { checkForReset: !0, triggerForReset: -1 },
            observatory: { checkForReset: !0, triggerForReset: -1 },
            amphitheatre: { checkForReset: !0, triggerForReset: -1 },
            broadcastTower: { checkForReset: !0, triggerForReset: -1 },
            tradepost: { checkForReset: !0, triggerForReset: -1 },
            chapel: { checkForReset: !0, triggerForReset: -1 },
            temple: { checkForReset: !0, triggerForReset: -1 },
            mint: { checkForReset: !0, triggerForReset: -1 },
            ziggurat: { checkForReset: !0, triggerForReset: -1 },
            chronosphere: { checkForReset: !0, triggerForReset: -1 },
            aiCore: { checkForReset: !0, triggerForReset: -1 },
            brewery: { checkForReset: !0, triggerForReset: -1 },
            barn: { checkForReset: !0, triggerForReset: -1 },
            harbor: { checkForReset: !0, triggerForReset: -1 },
            warehouse: { checkForReset: !0, triggerForReset: -1 },
            zebraOutpost: { checkForReset: !0, triggerForReset: -1 },
            zebraWorkshop: { checkForReset: !0, triggerForReset: -1 },
            zebraForge: { checkForReset: !0, triggerForReset: -1 },
          }),
          (this.religionItems = {
            unicornPasture: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Unknown_zp,
            },
            unicornTomb: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            ivoryTower: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            ivoryCitadel: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            skyPalace: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            unicornUtopia: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            sunspire: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            marker: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            unicornGraveyard: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            unicornNecropolis: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            blackPyramid: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Ziggurat,
            },
            solarchant: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            scholasticism: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            goldenSpire: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            sunAltar: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            stainedGlass: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            solarRevolution: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            basilica: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            templars: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            apocripha: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            transcendence: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.OrderOfTheSun,
            },
            blackObelisk: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Cryptotheology,
            },
            blackNexus: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Cryptotheology,
            },
            blackCore: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Cryptotheology,
            },
            singularity: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Cryptotheology,
            },
            blackLibrary: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Cryptotheology,
            },
            blackRadiance: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Cryptotheology,
            },
            blazar: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Cryptotheology,
            },
            darkNova: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Cryptotheology,
            },
            holyGenocide: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.UnicornItemVariant.Cryptotheology,
            },
          }),
          (this.spaceItems = {
            spaceElevator: { checkForReset: !0, triggerForReset: -1 },
            sattelite: { checkForReset: !0, triggerForReset: -1 },
            spaceStation: { checkForReset: !0, triggerForReset: -1 },
            moonOutpost: { checkForReset: !0, triggerForReset: -1 },
            moonBase: { checkForReset: !0, triggerForReset: -1 },
            planetCracker: { checkForReset: !0, triggerForReset: -1 },
            hydrofracturer: { checkForReset: !0, triggerForReset: -1 },
            spiceRefinery: { checkForReset: !0, triggerForReset: -1 },
            researchVessel: { checkForReset: !0, triggerForReset: -1 },
            orbitalArray: { checkForReset: !0, triggerForReset: -1 },
            sunlifter: { checkForReset: !0, triggerForReset: -1 },
            containmentChamber: { checkForReset: !0, triggerForReset: -1 },
            heatsink: { checkForReset: !0, triggerForReset: -1 },
            sunforge: { checkForReset: !0, triggerForReset: -1 },
            cryostation: { checkForReset: !0, triggerForReset: -1 },
            spaceBeacon: { checkForReset: !0, triggerForReset: -1 },
            terraformingStation: { checkForReset: !0, triggerForReset: -1 },
            hydroponics: { checkForReset: !0, triggerForReset: -1 },
            hrHarvester: { checkForReset: !0, triggerForReset: -1 },
            entangler: { checkForReset: !0, triggerForReset: -1 },
            tectonic: { checkForReset: !0, triggerForReset: -1 },
            moltenCore: { checkForReset: !0, triggerForReset: -1 },
          }),
          (this.timeItems = {
            temporalBattery: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.Chronoforge,
            },
            blastFurnace: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.Chronoforge,
            },
            timeBoiler: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.Chronoforge,
            },
            temporalAccelerator: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.Chronoforge,
            },
            temporalImpedance: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.Chronoforge,
            },
            ressourceRetrieval: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.Chronoforge,
            },
            cryochambers: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.VoidSpace,
            },
            voidHoover: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.VoidSpace,
            },
            voidRift: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.VoidSpace,
            },
            chronocontrol: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.VoidSpace,
            },
            voidResonator: {
              checkForReset: !0,
              triggerForReset: -1,
              variant: s.TimeItemVariant.VoidSpace,
            },
          }),
          (this.resources = {}),
          (this.items = {
            accelerateTime: { enabled: !0, subTrigger: 1 },
            timeSkip: {
              enabled: !1,
              subTrigger: 5,
              maximum: 50,
              autumn: !1,
              summer: !1,
              spring: !0,
              winter: !1,
              0: !1,
              1: !1,
              2: !1,
              3: !1,
              4: !1,
              5: !1,
              6: !1,
              7: !1,
              8: !1,
              9: !1,
            },
            reset: { enabled: !1 },
          });
      }
    }
    e.TimeControlSettings = a;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.TimeSettings = void 0);
    const s = i(6),
      o = i(4);
    class a extends o.SettingsSection {
      constructor() {
        super(...arguments),
          (this.trigger = 0),
          (this.items = {
            temporalBattery: { enabled: !1, variant: s.TimeItemVariant.Chronoforge, require: !1 },
            blastFurnace: { enabled: !1, variant: s.TimeItemVariant.Chronoforge, require: !1 },
            timeBoiler: { enabled: !1, variant: s.TimeItemVariant.Chronoforge, require: !1 },
            temporalAccelerator: {
              enabled: !1,
              variant: s.TimeItemVariant.Chronoforge,
              require: !1,
            },
            temporalImpedance: { enabled: !1, variant: s.TimeItemVariant.Chronoforge, require: !1 },
            ressourceRetrieval: {
              enabled: !1,
              variant: s.TimeItemVariant.Chronoforge,
              require: !1,
            },
            cryochambers: { enabled: !1, variant: s.TimeItemVariant.VoidSpace, require: !1 },
            voidHoover: {
              enabled: !1,
              variant: s.TimeItemVariant.VoidSpace,
              require: "antimatter",
            },
            voidRift: { enabled: !1, variant: s.TimeItemVariant.VoidSpace, require: !1 },
            chronocontrol: {
              enabled: !1,
              variant: s.TimeItemVariant.VoidSpace,
              require: "temporalFlux",
            },
            voidResonator: { enabled: !1, variant: s.TimeItemVariant.VoidSpace, require: !1 },
          });
      }
    }
    e.TimeSettings = a;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.TradingSettings = void 0);
    const s = i(4);
    class o extends s.SettingsSection {
      constructor() {
        super(...arguments),
          (this.trigger = 0.98),
          (this.items = {
            dragons: {
              enabled: !0,
              limited: !0,
              summer: !0,
              autumn: !0,
              winter: !0,
              spring: !0,
              require: "titanium",
            },
            zebras: {
              enabled: !0,
              limited: !0,
              summer: !0,
              autumn: !0,
              winter: !0,
              spring: !0,
              require: !1,
            },
            lizards: {
              enabled: !0,
              limited: !0,
              summer: !0,
              autumn: !1,
              winter: !1,
              spring: !1,
              require: "minerals",
            },
            sharks: {
              enabled: !0,
              limited: !0,
              summer: !1,
              autumn: !1,
              winter: !0,
              spring: !1,
              require: "iron",
            },
            griffins: {
              enabled: !0,
              limited: !0,
              summer: !1,
              autumn: !0,
              winter: !1,
              spring: !1,
              require: "wood",
            },
            nagas: {
              enabled: !0,
              limited: !0,
              summer: !0,
              autumn: !1,
              winter: !1,
              spring: !0,
              require: !1,
            },
            spiders: {
              enabled: !0,
              limited: !0,
              summer: !0,
              autumn: !0,
              winter: !1,
              spring: !0,
              require: !1,
            },
            leviathans: {
              enabled: !0,
              limited: !0,
              summer: !0,
              autumn: !0,
              winter: !0,
              spring: !0,
              require: "unobtainium",
            },
          });
      }
    }
    e.TradingSettings = o;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.UnlockingSettings = void 0);
    const s = i(4);
    class o extends s.SettingsSection {
      constructor() {
        super(...arguments),
          (this.items = {
            upgrades: { enabled: !0 },
            techs: { enabled: !0 },
            races: { enabled: !0 },
            missions: { enabled: !0 },
            buildings: { enabled: !0 },
          });
      }
    }
    e.UnlockingSettings = o;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.UserScript = e.DefaultLanguage = void 0);
    const s = i(9),
      o = i(34),
      a = i(35),
      n = s.__importDefault(i(42)),
      r = i(11),
      l = i(10),
      h = i(0),
      c = i(43),
      g = i(44);
    e.DefaultLanguage = "en";
    class u {
      constructor(t, i, s = e.DefaultLanguage) {
        (this.options = new r.Options()),
          l.cinfo("Kitten Scientists constructed."),
          (this.gamePage = t),
          (this.i18nEngine = i),
          (this._language = s),
          (this._i18nData = n.default),
          (this._userInterface = new g.UserInterface(this)),
          (this.engine = new a.Engine(this)),
          this._userInterface.construct(),
          this.injectOptions(new r.Options()),
          (this._activitySummary = new o.ActivitySummary(this));
      }
      injectOptions(t) {
        var e;
        (this.options = t),
          null === (e = this._userInterface) || void 0 === e || e.setState(this.options);
      }
      async run() {
        this._language in this._i18nData == !1 &&
          (l.cwarn(
            `Requested language '${this._language}' is not available. Falling back to '${e.DefaultLanguage}'.`
          ),
          (this._language = e.DefaultLanguage)),
          (this.gamePage.console.maxMessages = 1e3),
          this.resetActivitySummary(),
          l.cwarn("Kitten Scientists initialized. Engine NOT started for now."),
          this._userInterface.refreshUi();
      }
      i18n(t, i = []) {
        if (t.startsWith("$")) return this.i18nEngine(t.slice(1));
        let s = this._i18nData[this._language][t];
        if (void 0 === s) {
          if (((s = n.default[e.DefaultLanguage][t]), !s))
            return l.cwarn(`i18n key '${t}' not found in default language.`), "$" + t;
          l.cwarn(`i18n key '${t}' not found in selected language.`);
        }
        if (i) for (let t = 0; t < i.length; ++t) s = s.replace(`{${t}}`, "" + i[t]);
        return s;
      }
      _printOutput(t, e, ...i) {
        if (this.options.auto.filters.enabled)
          for (const t of Object.values(this.options.auto.filters.items))
            if (t.enabled && t.variant === i[1]) return;
        const s = this.gamePage.msg(...i, t);
        $(s.span).css("color", e), l.cdebug(i);
      }
      _message(...t) {
        this._printOutput("ks-default", "#aa50fe", ...t);
      }
      _activity(t, e) {
        if (e) {
          const i = "type_" + e;
          this._printOutput("ks-activity " + i, "#e65C00", t);
        } else this._printOutput("ks-activity", "#e65C00", t);
      }
      _summary(...t) {
        this._printOutput("ks-summary", "#009933", ...t);
      }
      warning(...t) {
        t.unshift("Warning!"), console && l.clog(t);
      }
      imessage(t, e = []) {
        this._message(this.i18n(t, e));
      }
      iactivity(t, e = [], i) {
        this._activity(this.i18n(t, e), i);
      }
      _isummary(t, e) {
        this._summary(this.i18n(t, e));
      }
      _iwarning(t, e) {
        this.warning(this.i18n(t, e));
      }
      resetActivitySummary() {
        this._activitySummary.resetActivity();
      }
      storeForSummary(t, e = 1, i = "other") {
        this._activitySummary.storeActivity(t, e, i);
      }
      displayActivitySummary() {
        const t = this._activitySummary.renderSummary();
        for (const e of t) this._summary(e);
        this.resetActivitySummary();
      }
      static async waitForGame(t = 3e4) {
        if ((l.cdebug(`Waiting for game... (timeout: ${Math.round(t / 1e3)}s)`), t < 0))
          throw new Error("Unable to find game page.");
        if (!u._isGameLoaded()) return await c.sleep(2e3), u.waitForGame(t - 2e3);
      }
      static async getDefaultInstance() {
        return new u(
          h.mustExist(u._window.gamePage),
          h.mustExist(u._window.$I),
          localStorage["com.nuclearunicorn.kittengame.language"]
        );
      }
      static _isGameLoaded() {
        return !h.isNil(u._window.gamePage);
      }
      static get _window() {
        try {
          return unsafeWindow;
        } catch (t) {
          return window;
        }
      }
    }
    e.UserScript = u;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.ActivitySummary = void 0);
    const s = i(2),
      o = i(0);
    e.ActivitySummary = class {
      constructor(t) {
        (this._sections = new Map()), (this._host = t);
      }
      resetActivity() {
        (this._sections = new Map()),
          (this._lastday = this._host.gamePage.calendar.day),
          (this._lastyear = this._host.gamePage.calendar.year);
      }
      storeActivity(t, e = 1, i = "other") {
        this._sections.has(i) || this._sections.set(i, new Map());
        const s = o.mustExist(this._sections.get(i));
        s.has(t) || s.set(t, 0), s.set(t, o.mustExist(s.get(t)) + e);
      }
      renderSummary() {
        const t = new Array();
        if (this._sections.has("other")) {
          o.mustExist(this._sections.get("other")).forEach((e, i) =>
            t.push(this._host.i18n("summary." + i, [this._host.gamePage.getDisplayValueExt(e)]))
          );
        }
        if (this._sections.has("research")) {
          o.mustExist(this._sections.get("research")).forEach((e, i) => {
            t.push(this._host.i18n("summary.tech", [s.ucfirst(i)]));
          });
        }
        if (this._sections.has("upgrade")) {
          o.mustExist(this._sections.get("upgrade")).forEach((e, i) => {
            t.push(this._host.i18n("summary.upgrade", [s.ucfirst(i)]));
          });
        }
        if (this._sections.has("build")) {
          o.mustExist(this._sections.get("build")).forEach((e, i) => {
            t.push(
              this._host.i18n("summary.building", [
                this._host.gamePage.getDisplayValueExt(e),
                s.ucfirst(i),
              ])
            );
          });
        }
        if (this._sections.has("faith")) {
          o.mustExist(this._sections.get("faith")).forEach((e, i) => {
            t.push(
              this._host.i18n("summary.sun", [
                this._host.gamePage.getDisplayValueExt(e),
                s.ucfirst(i),
              ])
            );
          });
        }
        if (this._sections.has("craft")) {
          o.mustExist(this._sections.get("craft")).forEach((e, i) => {
            t.push(
              this._host.i18n("summary.craft", [
                this._host.gamePage.getDisplayValueExt(e),
                s.ucfirst(i),
              ])
            );
          });
        }
        if (this._sections.has("trade")) {
          o.mustExist(this._sections.get("trade")).forEach((e, i) => {
            t.push(
              this._host.i18n("summary.trade", [
                this._host.gamePage.getDisplayValueExt(e),
                s.ucfirst(i),
              ])
            );
          });
        }
        if (this._lastday && this._lastyear) {
          let e = this._host.gamePage.calendar.year - this._lastyear,
            i = this._host.gamePage.calendar.day - this._lastday;
          i < 0 && ((e -= 1), (i += 400));
          let o = "";
          e > 0 &&
            ((o += e + " "),
            (o += 1 === e ? this._host.i18n("summary.year") : this._host.i18n("summary.years"))),
            i >= 0 &&
              (e > 0 && (o += this._host.i18n("summary.separator")),
              (o += s.roundToTwo(i) + " "),
              (o += 1 === i ? this._host.i18n("summary.day") : this._host.i18n("summary.days"))),
            t.push(this._host.i18n("summary.head", [o]));
        }
        return t;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.Engine = void 0);
    const s = i(36),
      o = i(8),
      a = i(13),
      n = i(5),
      r = i(12),
      l = i(37),
      h = i(38),
      c = i(7),
      g = i(39),
      u = i(1),
      d = i(0),
      m = i(40),
      p = i(6),
      _ = i(41);
    e.Engine = class {
      constructor(t) {
        (this.loop = void 0),
          (this._host = t),
          (this._upgradeManager = new _.UpgradeManager(this._host)),
          (this._buildManager = new s.BuildManager(this._host)),
          (this._spaceManager = new h.SpaceManager(this._host)),
          (this._craftManager = new n.CraftManager(this._host)),
          (this._bulkManager = new o.BulkManager(this._host)),
          (this._tradeManager = new m.TradeManager(this._host)),
          (this._religionManager = new l.ReligionManager(this._host)),
          (this._timeManager = new g.TimeManager(this._host)),
          (this._villageManager = new c.TabManager(this._host, "Village")),
          (this._cacheManager = new a.CacheManager(this._host));
      }
      start(t = !0) {
        this.loop ||
          ((this.loop = setInterval(this._iterate.bind(this), this._host.options.interval)),
          t && this._host.imessage("status.ks.enable"));
      }
      stop(t = !0) {
        this.loop &&
          (clearInterval(this.loop),
          (this.loop = void 0),
          t && this._host.imessage("status.ks.disable"));
      }
      async _iterate() {
        const t = this._host.options.auto.options;
        t.enabled && t.items.observe.enabled && this.observeStars(),
          this._host.options.auto.unlock.enabled && this.upgrade(),
          t.enabled && t.items.festival.enabled && this.holdFestival(),
          this._host.options.auto.build.enabled && this.build(),
          this._host.options.auto.space.enabled && this.space(),
          this._host.options.auto.craft.enabled && this.craft(),
          t.enabled && t.items.hunt.enabled && this.hunt(),
          this._host.options.auto.trade.enabled && this.trade(),
          this._host.options.auto.religion.enabled && this.worship(),
          this._host.options.auto.time.enabled && this.chrono(),
          t.enabled && t.items.crypto.enabled && this.crypto(),
          t.enabled && t.items.autofeed.enabled && this.autofeed(),
          t.enabled && t.items.promote.enabled && this.promote(),
          this._host.options.auto.distribute.enabled && this.distribute(),
          this._host.options.auto.timeCtrl.enabled && this.timeCtrl(),
          t.enabled && this.miscOptions(),
          this._host.options.auto.timeCtrl.enabled &&
            this._host.options.auto.timeCtrl.items.reset.enabled &&
            (await this.reset());
      }
      async reset() {
        if (this._host.gamePage.challenges.currentChallenge) return;
        const t = [],
          e = [],
          i = t => {
            if (0 !== e.length)
              for (const i in t) {
                if (!t[i].model.metadata) continue;
                const s = t[i].model.metadata.name,
                  o = e.indexOf(s);
                if (
                  -1 !== o &&
                  (e.splice(o, 1), this._host.gamePage.resPool.hasRes(t[i].model.prices))
                )
                  return !0;
              }
            return !1;
          };
        for (const [i, s] of u.objectEntries(this._host.options.auto.timeCtrl.buildItems))
          if (s.checkForReset) {
            let o;
            try {
              o = this._host.gamePage.bld.getBuildingExt(i);
            } catch (t) {
              o = null;
            }
            if (d.isNil(o)) continue;
            if (
              (t.push({
                name: d.mustExist(o.meta.label),
                trigger: s.triggerForReset,
                val: o.meta.val,
              }),
              0 < s.triggerForReset)
            ) {
              if (o.meta.val < s.triggerForReset) return;
            } else e.push(i);
          }
        const s = this._host.options.auto.timeCtrl.religionItems.unicornPasture;
        if (s.checkForReset) {
          const i = this._host.gamePage.bld.getBuildingExt("unicornPasture");
          if (
            (t.push({
              name: d.mustExist(i.meta.label),
              trigger: s.triggerForReset,
              val: i.meta.val,
            }),
            0 < s.triggerForReset)
          ) {
            if (i.meta.val < s.triggerForReset) return;
          } else e.push("unicornPasture");
        }
        if (i(this._buildManager.manager.tab.buttons) || e.length) return;
        for (const [i, s] of u.objectEntries(this._host.options.auto.timeCtrl.spaceItems))
          if (s.checkForReset) {
            const o = this._host.gamePage.space.getBuilding(i);
            if (
              (t.push({ name: o.label, trigger: s.triggerForReset, val: o.val }),
              0 < s.triggerForReset)
            ) {
              if (o.val < s.triggerForReset) return;
            } else e.push(i);
          }
        if (0 === e.length) {
          const t = this._spaceManager.manager.tab.planetPanels;
          for (const i in t)
            for (const s in t[i].children) {
              const o = t[i].children[s].model,
                a = o.metadata.name,
                n = e.indexOf(a);
              if (-1 !== n && (e.splice(n, 1), this._host.gamePage.resPool.hasRes(o.prices))) break;
            }
        }
        if (e.length) return;
        for (const [i, s] of u.objectEntries(this._host.options.auto.timeCtrl.religionItems))
          if (s.checkForReset) {
            const o = d.mustExist(this._religionManager.getBuild(i, s.variant));
            if (
              (t.push({ name: o.label, trigger: s.triggerForReset, val: o.val }),
              0 < s.triggerForReset)
            ) {
              if (o.val < s.triggerForReset) return;
            } else e.push(i);
          }
        if (
          i(this._religionManager.manager.tab.zgUpgradeButtons) ||
          i(this._religionManager.manager.tab.rUpgradeButtons) ||
          i(this._religionManager.manager.tab.children[0].children[0].children) ||
          e.length
        )
          return;
        for (const [i, s] of u.objectEntries(this._host.options.auto.timeCtrl.timeItems))
          if (s.checkForReset) {
            const o = d.mustExist(this._timeManager.getBuild(i, s.variant));
            if (
              (t.push({ name: o.label, trigger: s.triggerForReset, val: o.val }),
              0 < s.triggerForReset)
            ) {
              if (o.val < s.triggerForReset) return;
            } else e.push(i);
          }
        if (
          i(this._timeManager.manager.tab.children[2].children[0].children) ||
          i(this._timeManager.manager.tab.children[3].children[0].children) ||
          e.length
        )
          return;
        for (const [e, i] of u.objectEntries(this._host.options.auto.timeCtrl.resources))
          if (i.checkForReset) {
            const s = d.mustExist(this._host.gamePage.resPool.get(e));
            if (
              (t.push({ name: s.title, trigger: i.stockForReset, val: s.value }),
              s.value < i.stockForReset)
            )
              return;
          }
        this.stop(!1);
        const o = async (t = 1500) =>
          new Promise((e, i) => {
            (this._host.options.auto.engine.enabled &&
              this._host.options.auto.timeCtrl.enabled &&
              this._host.options.auto.timeCtrl.items.reset.enabled) ||
              i(new Error("canceled by player")),
              setTimeout(e, t);
          });
        try {
          for (const e of t)
            await o(500),
              this._host.imessage("reset.check", [
                e.name,
                this._host.gamePage.getDisplayValueExt(e.trigger),
                this._host.gamePage.getDisplayValueExt(e.val),
              ]);
          await o(0),
            this._host.imessage("reset.checked"),
            await o(),
            this._host.iactivity("reset.tip"),
            await o(),
            this._host.imessage("reset.countdown.10"),
            await o(2e3),
            this._host.imessage("reset.countdown.9"),
            await o(),
            this._host.imessage("reset.countdown.8"),
            await o(),
            this._host.imessage("reset.countdown.7"),
            await o(),
            this._host.imessage("reset.countdown.6"),
            await o(),
            this._host.imessage("reset.countdown.5"),
            await o(),
            this._host.imessage("reset.countdown.4"),
            await o(),
            this._host.imessage("reset.countdown.3"),
            await o(),
            this._host.imessage("reset.countdown.2"),
            await o(),
            this._host.imessage("reset.countdown.1"),
            await o(),
            this._host.imessage("reset.countdown.0"),
            await o(),
            this._host.iactivity("reset.last.message"),
            await o();
        } catch (t) {
          return (
            this._host.imessage("reset.cancel.message"),
            void this._host.iactivity("reset.cancel.activity")
          );
        }
        (this._host.options.reset.karmaLastTime = this._host.gamePage.resPool.get("karma").value),
          (this._host.options.reset.paragonLastTime =
            this._host.gamePage.resPool.get("paragon").value),
          (this._host.options.reset.times += 1),
          (this._host.options.reset.reset = !0);
        const a = this._host.options.asLegacyOptions();
        r.SettingsStorage.setLegacySettings(a);
        for (let t = 0; t < this._host.gamePage.challenges.challenges.length; t++)
          this._host.gamePage.challenges.challenges[t].pending = !1;
        this._host.gamePage.resetAutomatic();
      }
      timeCtrl() {
        const t = this._host.options.auto.timeCtrl.items;
        if (t.accelerateTime.enabled && !this._host.gamePage.time.isAccelerated) {
          const e = this._host.gamePage.resPool.get("temporalFlux");
          e.value >= e.maxValue * t.accelerateTime.subTrigger &&
            ((this._host.gamePage.time.isAccelerated = !0),
            this._host.iactivity("act.accelerate", [], "ks-accelerate"),
            this._host.storeForSummary("accelerate", 1));
        }
        if (t.timeSkip.enabled && this._host.gamePage.workshop.get("chronoforge").researched) {
          if (this._host.gamePage.calendar.day < 0) return;
          if (this._host.gamePage.resPool.get("timeCrystal").value < t.timeSkip.subTrigger) return;
          const e = this._host.gamePage.calendar.season;
          if (!t.timeSkip[this._host.gamePage.calendar.seasons[e].name]) return;
          const i = this._host.gamePage.calendar.cycle;
          if (!t.timeSkip[i]) return;
          const s = this._host.gamePage.getEffect("heatMax"),
            o = this._host.gamePage.time.heat;
          if (s <= o) return;
          const a = this._host.gamePage.calendar.yearsPerCycle,
            n = a - this._host.gamePage.calendar.cycleYear,
            r = this._host.gamePage.calendar.cyclesPerEra,
            l = this._host.gamePage.challenges.getChallenge("1000Years").researched ? 5 : 10;
          let h = Math.min(Math.floor((s - o) / l), t.timeSkip.maximum),
            c = 0;
          if (h < n) c = h;
          else {
            (c += n), (h -= n);
            let e = 1;
            for (; a < h && t.timeSkip[(i + e) % r]; ) (c += a), (h -= a), (e += 1);
            t.timeSkip[(i + e) % r] && 0 < h && (c += h);
          }
          if (0 < c) {
            const t = this._host.gamePage.timeTab.cfPanel.children[0].children[0];
            this._host.iactivity("act.time.skip", [c], "ks-timeSkip"),
              t.controller.doShatterAmt(t.model, c),
              this._host.storeForSummary("time.skip", c);
          }
        }
      }
      promote() {
        if (
          this._host.gamePage.science.get("civil").researched &&
          null !== this._host.gamePage.village.leader
        ) {
          const t = this._host.gamePage.village.leader,
            e = t.rank,
            i = this._craftManager.getResource("gold"),
            s = this._craftManager.getStock("gold");
          this._host.gamePage.village.sim.goldToPromote(e, e + 1, i.value - s)[0] &&
            1 === this._host.gamePage.village.sim.promote(t, e + 1) &&
            (this._host.iactivity("act.promote", [e + 1], "ks-promote"),
            this._host.gamePage.tabs[1].censusPanel.census.renderGovernment(
              this._host.gamePage.tabs[1].censusPanel.census
            ),
            this._host.gamePage.tabs[1].censusPanel.census.update(),
            this._host.storeForSummary("promote", 1));
        }
      }
      distribute() {
        if (!this._host.gamePage.village.getFreeKittens()) return;
        let t,
          e = 1 / 0,
          i = 0;
        for (const s of this._host.gamePage.village.jobs) {
          const o = s.name,
            a = s.unlocked,
            n = this._host.options.auto.distribute.items[o].enabled,
            r = this._host.gamePage.village.getJobLimit(o),
            l = this._host.options.auto.distribute.items[o].max,
            h = s.value,
            c = this._host.options.auto.distribute.items[o].limited;
          a && n && h < r && (!c || h < l) && ((i = h / l), i < e && ((e = i), (t = o)));
        }
        t &&
          (this._host.gamePage.village.assignJob(this._host.gamePage.village.getJob(t), 1),
          this._villageManager.render(),
          this._host.iactivity(
            "act.distribute",
            [this._host.i18n("$village.job." + t)],
            "ks-distribute"
          ),
          this._host.storeForSummary("distribute", 1));
      }
      autofeed() {
        const t = this._host.gamePage.diplomacy.get("leviathans"),
          e = this._host.gamePage.resPool.get("necrocorn");
        t.unlocked &&
          0 !== e.value &&
          (1 <= e.value
            ? t.energy < this._host.gamePage.diplomacy.getMarkerCap() &&
              (this._host.gamePage.diplomacy.feedElders(),
              this._host.iactivity("act.feed"),
              this._host.storeForSummary("feed", 1))
            : 0.25 * (1 + this._host.gamePage.getEffect("corruptionBoostRatio")) < 1 &&
              (this._host.storeForSummary("feed", e.value),
              this._host.gamePage.diplomacy.feedElders(),
              this._host.iactivity("dispose.necrocorn")));
      }
      crypto() {
        var t;
        const e = this._host.gamePage.calendar.cryptoPrice,
          i = this._host.gamePage.resPool.get("relic").value,
          s = this._host.gamePage.resPool.get("blackcoin").value;
        let o = 0,
          a = 0,
          n = !1;
        if (
          !1 === n &&
          e < 950 &&
          (null !== (t = this._host.options.auto.options.items.crypto.subTrigger) && void 0 !== t
            ? t
            : 0) < i
        ) {
          "function" == typeof this._host.gamePage.diplomacy.buyEcoin
            ? this._host.gamePage.diplomacy.buyEcoin()
            : this._host.gamePage.diplomacy.buyBcoin();
          const t = this._host.gamePage.resPool.get("blackcoin").value;
          (o = Math.round(t - s)), this._host.iactivity("blackcoin.buy", [o]);
        } else if (e > 1050 && 0 < this._host.gamePage.resPool.get("blackcoin").value) {
          (n = !0),
            "function" == typeof this._host.gamePage.diplomacy.sellEcoin
              ? this._host.gamePage.diplomacy.sellEcoin()
              : this._host.gamePage.diplomacy.sellBcoin();
          const t = d.mustExist(this._host.gamePage.resPool.get("relic")).value;
          (a = Math.round(t - i)), this._host.iactivity("blackcoin.sell", [a]);
        }
      }
      worship() {
        const t = this._host.options.auto.religion.addition;
        if (t.bestUnicornBuilding.enabled) {
          const t = this.getBestUnicornBuilding();
          if (null !== t)
            if ("unicornPasture" === t) this._buildManager.build(t, 0, 1);
            else {
              const e = d.mustExist(
                this._religionManager.getBuildButton(t, p.UnicornItemVariant.Ziggurat)
              );
              let i = 0;
              for (const t of e.model.prices) "tears" === t.name && (i = t.val);
              const s = this._craftManager.getValue("tears") - this._craftManager.getStock("tears");
              if (s < i) {
                const t = Math.floor(
                    (this._craftManager.getValue("unicorns") -
                      this._craftManager.getStock("unicorns")) /
                      2500
                  ),
                  e = Math.ceil(
                    (i - s) / this._host.gamePage.bld.getBuildingExt("ziggurat").meta.on
                  );
                e < t &&
                  this._host.gamePage.religionTab.sacrificeBtn.controller._transform(
                    this._host.gamePage.religionTab.sacrificeBtn.model,
                    e
                  );
              }
              this._religionManager.build(t, p.UnicornItemVariant.Ziggurat, 1);
            }
        } else {
          const t = Object.assign(
            {},
            this._host.options.auto.religion.items,
            Object.fromEntries(
              Object.entries(this._host.options.auto.religion.items).filter(
                ([t, e]) => e.variant !== p.UnicornItemVariant.Unknown_zp
              )
            )
          );
          this._host.options.auto.religion.items.unicornPasture.enabled &&
            this.build({ unicornPasture: { require: !1, enabled: !0, max: 0 } }),
            this._buildReligionBuildings(t);
        }
        const e = this._craftManager.getResource("faith"),
          i = e.value / e.maxValue;
        if (0.98 <= i) {
          const i = this._host.gamePage.religion.faith;
          let s = this._host.gamePage.religion.faithRatio;
          const o = d.mustExist(this._host.gamePage.religion.getRU("transcendence")).on;
          let a = o ? this._host.gamePage.religion.transcendenceTier : 0;
          if (t.transcend.enabled && o) {
            const t = Math.pow((a + 2) / (a + 1), 2),
              e =
                this._host.gamePage.religion._getTranscendTotalPrice(a + 1) -
                this._host.gamePage.religion._getTranscendTotalPrice(a),
              i = e,
              o = t;
            if (
              ((1 - o + Math.sqrt(80 * (o * o - 1) * i + (o - 1) * (o - 1))) * o) /
                (40 * (o + 1) * (o + 1) * (o - 1)) +
                i +
                i / (o * o - 1) <=
              s
            ) {
              (this._host.gamePage.religion.faithRatio -= e),
                (this._host.gamePage.religion.tcratio += e),
                (this._host.gamePage.religion.transcendenceTier += 1);
              const t = d.mustExist(this._host.gamePage.challenges.getChallenge("atheism"));
              t.calculateEffects(t, this._host.gamePage);
              const i = d.mustExist(this._host.gamePage.religion.getTU("blackObelisk"));
              i.calculateEffects(i, this._host.gamePage),
                this._host.gamePage.msg(
                  this._host.i18nEngine("religion.transcend.msg.success", [
                    this._host.gamePage.religion.transcendenceTier,
                  ])
                ),
                (s = this._host.gamePage.religion.faithRatio),
                (a = this._host.gamePage.religion.transcendenceTier),
                this._host.iactivity(
                  "act.transcend",
                  [this._host.gamePage.getDisplayValueExt(e), a],
                  "ks-transcend"
                ),
                this._host.storeForSummary("transcend", 1);
            }
          }
          if (t.adore.enabled && d.mustExist(this._host.gamePage.religion.getRU("apocripha")).on) {
            const o = 10 + this._host.gamePage.getEffect("solarRevolutionLimit"),
              n = o * t.adore.subTrigger,
              r = (i / 1e6) * a * a * 1.01,
              l = s + r,
              h = 0.01 + e.value * (1 + 0.1 * this._host.gamePage.getUnlimitedDR(l, 0.1));
            n <=
              this._host.gamePage.getLimitedDR(
                this._host.gamePage.getUnlimitedDR(h, 1e3) / 100,
                o
              ) &&
              (this._host.gamePage.religion._resetFaithInternal(1.01),
              this._host.iactivity(
                "act.adore",
                [
                  this._host.gamePage.getDisplayValueExt(i),
                  this._host.gamePage.getDisplayValueExt(r),
                ],
                "ks-adore"
              ),
              this._host.storeForSummary("adore", r));
          }
        }
        if (t.autoPraise.enabled && t.autoPraise.subTrigger <= i) {
          let t;
          t = this._host.gamePage.religion.getFaithBonus
            ? this._host.gamePage.religion.getFaithBonus()
            : this._host.gamePage.religion.getApocryphaBonus();
          const i = e.value * (1 + t);
          this._host.storeForSummary("praise", i),
            this._host.iactivity(
              "act.praise",
              [
                this._host.gamePage.getDisplayValueExt(e.value),
                this._host.gamePage.getDisplayValueExt(i),
              ],
              "ks-praise"
            ),
            this._host.gamePage.religion.praise();
        }
      }
      _buildReligionBuildings(t) {
        const e = this._host.options.auto.religion.trigger;
        this._religionManager.manager.render();
        const i = {};
        for (const [e, s] of u.objectEntries(t)) {
          const t = this._religionManager.getBuild(e, s.variant);
          if (null === t) continue;
          i[e] = t;
          const o = d.mustExist(i[e]);
          if (this._religionManager.getBuildButton(e, s.variant)) {
            const t = d.mustExist(this._religionManager.getBuildButton(e, s.variant)).model,
              i =
                s.variant !== p.UnicornItemVariant.Cryptotheology ||
                this._host.gamePage.science.get("cryptotheology").researched;
            o.rHidden = !(t.visible && t.enabled && i);
          } else o.rHidden = !0;
        }
        const s = this._bulkManager.bulk(t, i, e);
        let o = !1;
        for (const t in s)
          0 < s[t].count &&
            (this._religionManager.build(s[t].id, d.mustExist(s[t].variant), s[t].count), (o = !0));
        o && this._host.gamePage.ui.render();
      }
      chrono() {
        if (!this._host.gamePage.timeTab.visible) return;
        const t = this._host.options.auto.time.items,
          e = this._host.options.auto.time.trigger;
        this._timeManager.manager.render();
        const i = {};
        for (const [e, s] of u.objectEntries(t)) {
          i[e] = d.mustExist(this._timeManager.getBuild(e, s.variant));
          const t = d.mustExist(this._timeManager.getBuildButton(e, s.variant)).model,
            o =
              s.variant === p.TimeItemVariant.Chronoforge
                ? this._timeManager.manager.tab.cfPanel
                : this._timeManager.manager.tab.vsPanel;
          d.mustExist(i[e]).tHidden = !t.visible || !t.enabled || !(null == o ? void 0 : o.visible);
        }
        const s = this._bulkManager.bulk(t, i, e);
        let o = !1;
        for (const t in s)
          s[t].count > 0 && (this._timeManager.build(s[t].id, s[t].variant, s[t].count), (o = !0));
        o && this._host.gamePage.ui.render();
      }
      upgrade() {
        const t = this._host.options.auto.unlock.items,
          e = this._upgradeManager,
          i = this._craftManager,
          s = this._bulkManager,
          o = this._buildManager;
        if (
          (e.workshopManager.render(),
          e.scienceManager.render(),
          e.spaceManager.render(),
          t.upgrades.enabled && this._host.gamePage.tabs[3].visible)
        ) {
          const t = this._host.gamePage.workshop.upgrades;
          t: for (const s in t) {
            if (t[s].researched || !t[s].unlocked) continue;
            let o = dojo.clone(t[s].prices);
            o = this._host.gamePage.village.getEffectLeader("scientist", o);
            for (const t in o) if (i.getValueAvailable(o[t].name, !0) < o[t].val) continue t;
            e.build(t[s], "workshop");
          }
        }
        if (t.techs.enabled && this._host.gamePage.tabs[2].visible) {
          const t = this._host.gamePage.science.techs;
          t: for (const s in t) {
            if (t[s].researched || !t[s].unlocked) continue;
            let o = dojo.clone(t[s].prices);
            o = this._host.gamePage.village.getEffectLeader("scientist", o);
            for (const t in o) if (i.getValueAvailable(o[t].name, !0) < o[t].val) continue t;
            e.build(t[s], "science");
          }
        }
        if (t.missions.enabled && this._host.gamePage.tabs[6].visible) {
          const t = this._host.gamePage.space.meta[0].meta;
          t: for (let e = 0; e < t.length; e++) {
            if (0 < t[e].val || !t[e].unlocked) continue;
            const s = this._spaceManager.manager.tab.GCPanel.children[e],
              o = s.model.prices;
            for (const t in o) if (i.getValueAvailable(o[t].name, !0) < o[t].val) continue t;
            s.domNode.click(),
              7 === e || 12 === e
                ? this._host.iactivity("upgrade.space.mission", [t[e].label], "ks-upgrade")
                : this._host.iactivity("upgrade.space", [t[e].label], "ks-upgrade");
          }
        }
        if (t.races.enabled && this._host.gamePage.tabs[4].visible) {
          const t = this._host.gamePage.diplomacy.get("leviathans").unlocked ? 8 : 7;
          if (this._host.gamePage.diplomacyTab.racePanels.length < t) {
            let t = i.getValueAvailable("manpower", !0);
            this._host.gamePage.diplomacy.get("lizards").unlocked ||
              (t >= 1e3 &&
                ((this._host.gamePage.resPool.get("manpower").value -= 1e3),
                this._host.iactivity(
                  "upgrade.race",
                  [this._host.gamePage.diplomacy.unlockRandomRace().title],
                  "ks-upgrade"
                ),
                (t -= 1e3),
                this._host.gamePage.ui.render())),
              this._host.gamePage.diplomacy.get("sharks").unlocked ||
                (t >= 1e3 &&
                  ((this._host.gamePage.resPool.get("manpower").value -= 1e3),
                  this._host.iactivity(
                    "upgrade.race",
                    [this._host.gamePage.diplomacy.unlockRandomRace().title],
                    "ks-upgrade"
                  ),
                  (t -= 1e3),
                  this._host.gamePage.ui.render())),
              this._host.gamePage.diplomacy.get("griffins").unlocked ||
                (t >= 1e3 &&
                  ((this._host.gamePage.resPool.get("manpower").value -= 1e3),
                  this._host.iactivity(
                    "upgrade.race",
                    [this._host.gamePage.diplomacy.unlockRandomRace().title],
                    "ks-upgrade"
                  ),
                  (t -= 1e3),
                  this._host.gamePage.ui.render())),
              !this._host.gamePage.diplomacy.get("nagas").unlocked &&
                this._host.gamePage.resPool.get("culture").value >= 1500 &&
                t >= 1e3 &&
                ((this._host.gamePage.resPool.get("manpower").value -= 1e3),
                this._host.iactivity(
                  "upgrade.race",
                  [this._host.gamePage.diplomacy.unlockRandomRace().title],
                  "ks-upgrade"
                ),
                (t -= 1e3),
                this._host.gamePage.ui.render()),
              !this._host.gamePage.diplomacy.get("zebras").unlocked &&
                this._host.gamePage.resPool.get("ship").value >= 1 &&
                t >= 1e3 &&
                ((this._host.gamePage.resPool.get("manpower").value -= 1e3),
                this._host.iactivity(
                  "upgrade.race",
                  [this._host.gamePage.diplomacy.unlockRandomRace().title],
                  "ks-upgrade"
                ),
                (t -= 1e3),
                this._host.gamePage.ui.render()),
              !this._host.gamePage.diplomacy.get("spiders").unlocked &&
                d.mustExist(this._host.gamePage.resPool.get("ship")).value >= 100 &&
                d.mustExist(this._host.gamePage.resPool.get("science")).maxValue > 125e3 &&
                t >= 1e3 &&
                ((d.mustExist(this._host.gamePage.resPool.get("manpower")).value -= 1e3),
                this._host.iactivity(
                  "upgrade.race",
                  [this._host.gamePage.diplomacy.unlockRandomRace().title],
                  "ks-upgrade"
                ),
                (t -= 1e3),
                this._host.gamePage.ui.render()),
              !this._host.gamePage.diplomacy.get("dragons").unlocked &&
                this._host.gamePage.science.get("nuclearFission").researched &&
                t >= 1e3 &&
                ((d.mustExist(this._host.gamePage.resPool.get("manpower")).value -= 1e3),
                this._host.iactivity(
                  "upgrade.race",
                  [this._host.gamePage.diplomacy.unlockRandomRace().title],
                  "ks-upgrade"
                ),
                (t -= 1e3),
                this._host.gamePage.ui.render());
          }
        }
        if (t.buildings.enabled) {
          const t =
              0 === this._host.gamePage.bld.getBuildingExt("pasture").meta.stage
                ? this._host.gamePage.bld.getBuildingExt("pasture").meta.val
                : 0,
            e =
              0 === this._host.gamePage.bld.getBuildingExt("aqueduct").meta.stage
                ? this._host.gamePage.bld.getBuildingExt("aqueduct").meta.val
                : 0,
            a = this._host.gamePage.bld.getBuildingExt("pasture").meta;
          if (
            0 === a.stage &&
            d.mustExist(a.stages)[1].stageUnlocked &&
            i.getPotentialCatnip(!0, 0, e) > 0
          ) {
            const t = d.mustExist(a.stages)[1].prices;
            if (s.singleBuildPossible(a, t, 1)) {
              const t = d.mustExist(o.getBuildButton("pasture", 0));
              return (
                t.controller.sellInternal(t.model, 0),
                (a.on = 0),
                (a.val = 0),
                (a.stage = 1),
                this._host.iactivity("upgrade.building.pasture", [], "ks-upgrade"),
                this._host.gamePage.ui.render(),
                o.build("pasture", 1, 1),
                void this._host.gamePage.ui.render()
              );
            }
          }
          const n = this._host.gamePage.bld.getBuildingExt("aqueduct").meta;
          if (
            0 === n.stage &&
            d.mustExist(n.stages)[1].stageUnlocked &&
            i.getPotentialCatnip(!0, t, 0) > 0
          ) {
            const t = d.mustExist(n.stages)[1].prices;
            if (s.singleBuildPossible(n, t, 1)) {
              const t = d.mustExist(o.getBuildButton("aqueduct", 0));
              return (
                t.controller.sellInternal(t.model, 0),
                (n.on = 0),
                (n.val = 0),
                (n.stage = 1),
                n.calculateEffects(n, this._host.gamePage),
                this._host.iactivity("upgrade.building.aqueduct", [], "ks-upgrade"),
                this._host.gamePage.ui.render(),
                o.build("aqueduct", 1, 1),
                void this._host.gamePage.ui.render()
              );
            }
          }
          const r = this._host.gamePage.bld.getBuildingExt("library").meta;
          if (0 === r.stage && d.mustExist(r.stages)[1].stageUnlocked) {
            let t = this._host.gamePage.workshop.get("cryocomputing").researched ? 1 : 2;
            "energy" === this._host.gamePage.challenges.currentChallenge && (t *= 2);
            let e = 3;
            if (
              (this._host.gamePage.workshop.get("uplink").researched &&
                (e *=
                  1 +
                  this._host.gamePage.bld.get("biolab").val *
                    this._host.gamePage.getEffect("uplinkDCRatio")),
              this._host.gamePage.workshop.get("machineLearning").researched &&
                (e *=
                  1 +
                  this._host.gamePage.bld.get("aiCore").on *
                    this._host.gamePage.getEffect("dataCenterAIRatio")),
              this._host.gamePage.resPool.energyProd >=
                this._host.gamePage.resPool.energyCons + (t * r.val) / e)
            ) {
              const t = d.mustExist(r.stages)[1].prices;
              if (s.singleBuildPossible(r, t, 1)) {
                const t = d.mustExist(o.getBuildButton("library", 0));
                return (
                  t.controller.sellInternal(t.model, 0),
                  (r.on = 0),
                  (r.val = 0),
                  (r.stage = 1),
                  r.calculateEffects(r, this._host.gamePage),
                  this._host.iactivity("upgrade.building.library", [], "ks-upgrade"),
                  this._host.gamePage.ui.render(),
                  o.build("library", 1, 1),
                  void this._host.gamePage.ui.render()
                );
              }
            }
          }
          const l = this._host.gamePage.bld.getBuildingExt("amphitheatre").meta;
          if (0 === l.stage && d.mustExist(l.stages)[1].stageUnlocked) {
            const t = d.mustExist(l.stages)[1].prices;
            if (s.singleBuildPossible(l, t, 1)) {
              const t = d.mustExist(o.getBuildButton("amphitheatre", 0));
              return (
                t.controller.sellInternal(t.model, 0),
                (l.on = 0),
                (l.val = 0),
                (l.stage = 1),
                this._host.iactivity("upgrade.building.amphitheatre", [], "ks-upgrade"),
                this._host.gamePage.ui.render(),
                o.build("amphitheatre", 1, 1),
                void this._host.gamePage.ui.render()
              );
            }
          }
        }
      }
      build(t = this._host.options.auto.build.items) {
        var e;
        const i = this._buildManager,
          s = this._bulkManager,
          o = this._host.options.auto.build.trigger;
        i.manager.render();
        const a = {};
        for (const [s, o] of u.objectEntries(t))
          a[s] = i.getBuild(null !== (e = o.name) && void 0 !== e ? e : s).meta;
        const n = s.bulk(t, a, o, "bonfire");
        let r = !1;
        for (const t in n)
          n[t].count > 0 && (i.build(n[t].name || n[t].id, n[t].stage, n[t].count), (r = !0));
        r && this._host.gamePage.ui.render();
      }
      space() {
        const t = this._host.options.auto.space.items,
          e = this._spaceManager,
          i = this._bulkManager,
          s = this._host.options.auto.space.trigger;
        e.manager.render();
        const o = {};
        for (const [i, s] of u.objectEntries(t)) o[i] = e.getBuild(i);
        const a = i.bulk(t, o, s, "space");
        let n = !1;
        for (const t in a) a[t].count > 0 && (e.build(a[t].id, a[t].count), (n = !0));
        n && this._host.gamePage.ui.render();
      }
      craft() {
        const t = this._host.options.auto.craft.items,
          e = this._craftManager,
          i = this._host.options.auto.craft.trigger;
        for (const [s, o] of u.objectEntries(t)) {
          const t = !!o.max && e.getResource(s),
            a = !!o.require && e.getResource(o.require);
          let n = 0;
          (t && t.value > o.max) ||
            (e.singleCraftPossible(s) &&
              (!a || i <= a.value / a.maxValue
                ? (n = e.getLowestCraftAmount(s, o.limited, o.limRat, !0))
                : o.limited && (n = e.getLowestCraftAmount(s, o.limited, o.limRat, !1)),
              n > 0 && e.craft(s, n)));
        }
      }
      holdFestival() {
        if (
          !this._host.gamePage.science.get("drama").researched ||
          400 < this._host.gamePage.calendar.festivalDays
        )
          return;
        if (
          !this._host.gamePage.prestige.getPerk("carnivals").researched &&
          0 < this._host.gamePage.calendar.festivalDays
        )
          return;
        const t = this._craftManager;
        if (
          t.getValueAvailable("manpower", !0) < 1500 ||
          t.getValueAvailable("culture", !0) < 5e3 ||
          t.getValueAvailable("parchment", !0) < 2500
        )
          return;
        const e = 4e3 * t.getTickVal(t.getResource("manpower"), !0) > 1500,
          i = 4e3 * t.getTickVal(t.getResource("culture"), !0) > 5e3,
          s = 4e3 * t.getTickVal(t.getResource("parchment"), !0) > 2500;
        if (
          e &&
          i &&
          s &&
          (this._villageManager.render(), this._host.gamePage.villageTab.festivalBtn.model.enabled)
        ) {
          const t = this._host.gamePage.calendar.festivalDays;
          this._host.gamePage.villageTab.festivalBtn.onClick(),
            this._host.storeForSummary("festival"),
            t > 0
              ? this._host.iactivity("festival.extend", [], "ks-festival")
              : this._host.iactivity("festival.hold", [], "ks-festival");
        }
      }
      observeStars() {
        null !== this._host.gamePage.calendar.observeBtn &&
          (this._host.gamePage.calendar.observeHandler(),
          this._host.iactivity("act.observe", [], "ks-star"),
          this._host.storeForSummary("stars", 1));
      }
      hunt() {
        var t;
        const e = this._craftManager.getResource("manpower");
        if (
          (null !== (t = this._host.options.auto.options.items.hunt.subTrigger) && void 0 !== t
            ? t
            : 0) <=
            e.value / e.maxValue &&
          100 <= e.value
        ) {
          let t = Math.floor(e.value / 100);
          this._host.storeForSummary("hunt", t),
            this._host.iactivity("act.hunt", [t], "ks-hunt"),
            (t = Math.floor(e.value / 100));
          const i = this._craftManager.getAverageHunt(),
            s = {};
          for (const [e, o] of u.objectEntries(i)) {
            const i = this._craftManager.getResource(e);
            s[e] = 0 < i.maxValue ? Math.min(o * t, Math.max(i.maxValue - i.value, 0)) : o * t;
          }
          this._cacheManager.pushToCache({
            materials: s,
            timeStamp: this._host.gamePage.timer.ticksTotal,
          }),
            this._host.gamePage.village.huntAll();
        }
      }
      trade() {
        if ((this._tradeManager.manager.render(), !this._tradeManager.singleTradePossible()))
          return;
        const t = [],
          e = this._craftManager.getResource("gold"),
          i = this._host.options.auto.trade.trigger,
          s = this._host.gamePage.calendar.getCurSeason().name;
        for (const [o, a] of u.objectEntries(this._host.options.auto.trade.items)) {
          const n = this._tradeManager.getRace(o);
          if (!(a.enabled && a[s] && n.unlocked && this._tradeManager.singleTradePossible(o)))
            continue;
          if (!this._tradeManager.getTradeButton(n.name).model.enabled) continue;
          const r = !!a.require && this._craftManager.getResource(a.require),
            l = this._tradeManager.getProfitability(o);
          ((a.limited && l) || ((!r || i <= r.value / r.maxValue) && i <= e.value / e.maxValue)) &&
            t.push(o);
        }
        if (0 === t.length) return;
        let o = this._tradeManager.getLowestTradeAmount(null, !0, !1);
        if (o < 1) return;
        const a = [];
        for (let s = 0; s < t.length; s++) {
          const o = t[s],
            n = this._host.options.auto.trade.items[o],
            r = !!n.require && this._craftManager.getResource(n.require),
            l = (!r || i <= r.value / r.maxValue) && i <= e.value / e.maxValue,
            h = this._tradeManager.getLowestTradeAmount(o, n.limited, l);
          h < 1 ? (t.splice(s, 1), s--) : a.push(h);
        }
        if (0 === t.length) return;
        const n = {};
        for (; 0 < t.length && 1 <= o; ) {
          if (o < t.length) {
            const e = Math.floor(Math.random() * t.length);
            n[t[e]] || (n[t[e]] = 0), (n[t[e]] += 1), (o -= 1), t.splice(e, 1), a.splice(e, 1);
            continue;
          }
          let e = Math.floor(o / t.length),
            i = 0;
          for (let s = 0; s < t.length; ++s) a[s] < e && ((e = a[s]), (i = s));
          n[t[i]] || (n[t[i]] = 0), (n[t[i]] += e), (o -= e), t.splice(i, 1), a.splice(i, 1);
        }
        if (0 === Object.values(n).length) return;
        const r = {};
        for (const [t, e] of u.objectEntries(n)) {
          const i = this._tradeManager.getRace(t),
            s = this._tradeManager.getMaterials(t);
          for (const [t, i] of u.objectEntries(s)) r[t] || (r[t] = 0), (r[t] -= i * e);
          const o = this._tradeManager.getAverageTrade(i);
          for (const [e, i] of u.objectEntries(o)) {
            const s = this._craftManager.getResource(e);
            r[e] || (r[e] = 0),
              (r[e] +=
                s.maxValue > 0
                  ? Math.min(
                      d.mustExist(o[e]) * d.mustExist(n[t]),
                      Math.max(s.maxValue - s.value, 0)
                    )
                  : i * d.mustExist(n[t]));
          }
        }
        this._cacheManager.pushToCache({
          materials: r,
          timeStamp: this._host.gamePage.timer.ticksTotal,
        });
        for (const [t, e] of u.objectEntries(n)) 0 < e && this._tradeManager.trade(t, e);
      }
      miscOptions() {
        var t;
        const e = this._craftManager,
          i = this._buildManager,
          s = this._host.options.auto.options.items;
        t: if (s.buildEmbassies.enabled && this._host.gamePage.diplomacy.races[0].embassyPrices) {
          const i = e.getResource("culture");
          let o = 0;
          if (
            (null !== (t = s.buildEmbassies.subTrigger) && void 0 !== t ? t : 0) <=
            i.value / i.maxValue
          ) {
            const t = this._host.gamePage.diplomacyTab.racePanels;
            o = e.getValueAvailable("culture", !0);
            const i = {},
              s = [];
            for (let e = 0; e < t.length; e++) {
              if (!t[e].embassyButton) continue;
              const o = t[e].race.name,
                a = this._host.gamePage.diplomacy.get(o);
              (i[o] = {
                val: 0,
                basePrice: a.embassyPrices[0].val,
                currentEm: a.embassyLevel,
                priceSum: 0,
                race: a,
              }),
                s.push(o);
            }
            if (0 === s.length) break t;
            let a = !1;
            for (; s.length > 0; )
              for (let t = 0; t < s.length; t++) {
                const e = s[t],
                  n = d.mustExist(i[e]),
                  r = n.basePrice * Math.pow(1.15, n.currentEm + n.val);
                r <= o
                  ? ((o -= r), (n.priceSum += r), (n.val += 1), (a = !0))
                  : (s.splice(t, 1), --t);
              }
            for (const [t, s] of u.objectEntries(i))
              0 !== s.val &&
                ((o = e.getValueAvailable("culture", !0)),
                o < s.priceSum &&
                  this._host.warning("Something has gone horribly wrong." + [s.priceSum, o]),
                (this._host.gamePage.resPool.resources[13].value -= s.priceSum),
                (s.race.embassyLevel += s.val),
                this._host.storeForSummary("embassy", s.val),
                1 !== s.val
                  ? this._host.iactivity("build.embassies", [s.val, s.race.title], "ks-trade")
                  : this._host.iactivity("build.embassy", [s.val, s.race.title], "ks-trade"));
            a && this._host.gamePage.ui.render();
          }
        }
        if (s.fixCry.enabled && 0 < this._host.gamePage.time.getVSU("usedCryochambers").val) {
          let t = 0;
          const e = this._timeManager.manager.tab.vsPanel.children[0].children[0];
          for (; e.controller.doFixCryochamber(e.model); ) ++t;
          0 < t &&
            (this._host.iactivity("act.fix.cry", [t], "ks-fixCry"),
            this._host.storeForSummary("fix.cry", t));
        }
        if (s._steamworks.enabled) {
          const t = this._host.gamePage.bld.getBuildingExt("steamworks");
          if (t.meta.val && 0 === t.meta.on) {
            const t = d.mustExist(i.getBuildButton("steamworks"));
            t.controller.onAll(t.model);
          }
        }
      }
      getBestUnicornBuilding() {
        const t = this._buildManager.getBuildButton("unicornPasture");
        if (null === t) return null;
        const e = [
            "unicornTomb",
            "ivoryTower",
            "ivoryCitadel",
            "skyPalace",
            "unicornUtopia",
            "sunspire",
          ],
          i =
            this._host.gamePage.getEffect("unicornsPerTickBase") *
            this._host.gamePage.getTicksPerSecondUI(),
          s = this._host.gamePage.getEffect("unicornsGlobalRatio") + 1,
          o = this._host.gamePage.getEffect("unicornsRatioReligion") + 1,
          a = this._host.gamePage.prestige.getParagonProductionRatio() + 1,
          n = this._host.gamePage.religion.getSolarRevolutionRatio() + 1,
          r = this._host.gamePage.calendar.cycle,
          l = this._host.gamePage.calendar.cycles[r];
        let h = 1;
        void 0 !== l.festivalEffects.unicorns &&
          this._host.gamePage.prestige.getPerk("numeromancy").researched &&
          this._host.gamePage.calendar.festivalDays &&
          (h = l.festivalEffects.unicorns);
        const c = i * s * o * a * n * h,
          g = Math.max(this._host.gamePage.bld.getBuildingExt("ziggurat").meta.on, 1),
          u = 500 * (1 + 0.1 * this._host.gamePage.getEffect("unicornsRatioReligion"));
        let m = 1;
        this._host.gamePage.prestige.getPerk("unicornmancy").researched && (m *= 1.1);
        const p = ((this._host.gamePage.getEffect("riftChance") * m) / 2e4) * u;
        let _ = 1 / 0,
          b = null;
        const f =
            d.mustExist(
              this._host.gamePage.bld.getBuildingExt("unicornPasture").meta.effects
                .unicornsPerTickBase
            ) *
            this._host.gamePage.getTicksPerSecondUI() *
            s *
            o *
            a *
            n *
            h,
          k = t.model.prices[0].val / f;
        k < _ && ((_ = k), (b = "unicornPasture"));
        for (const t of this._religionManager.manager.tab.zgUpgradeButtons)
          if (e.includes(t.id) && t.model.visible) {
            let e = 0;
            for (const i in t.model.prices)
              "unicorns" === t.model.prices[i].name && (e += t.model.prices[i].val),
                "tears" === t.model.prices[i].name && (e += (2500 * t.model.prices[i].val) / g);
            const r = d.mustExist(this._host.gamePage.religion.getZU(t.id));
            let l = o,
              u = this._host.gamePage.getEffect("riftChance");
            for (const t in r.effects)
              "unicornsRatioReligion" === t && (l += d.mustExist(r.effects.unicornsRatioReligion)),
                "riftChance" === t && (u += d.mustExist(r.effects.riftChance));
            let f = ((u * m) / 2e4) * (500 * (0.1 * (l - 1) + 1));
            f -= p;
            let k = i * s * l * a * n * h;
            (k -= c), (k += f);
            const y = e / k;
            y < _ && (0 < f || (o < l && 0 < e)) && ((_ = y), (b = t.id));
          }
        return b;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.BuildManager = void 0);
    const s = i(8),
      o = i(5),
      a = i(7),
      n = i(0);
    e.BuildManager = class {
      constructor(t) {
        (this._host = t),
          (this.manager = new a.TabManager(this._host, "Bonfire")),
          (this._crafts = new o.CraftManager(this._host)),
          (this._bulkManager = new s.BulkManager(this._host));
      }
      build(t, e, i) {
        const s = this.getBuild(t),
          o = this.getBuildButton(t, e);
        if (!o || !o.model.enabled) return;
        const a = i,
          n = this._getBuildLabel(s.meta, e);
        (i = this._bulkManager.construct(o.model, o, i)) !== a &&
          this._host.warning(`${n} Amount ordered: ${a} Amount Constructed: ${i}`),
          this._host.storeForSummary(n, i, "build"),
          1 === i
            ? this._host.iactivity("act.build", [n], "ks-build")
            : this._host.iactivity("act.builds", [n, i], "ks-build");
      }
      _getBuildLabel(t, e) {
        return t.stages && e ? t.stages[e].label : n.mustExist(t.label);
      }
      getBuild(t) {
        return this._host.gamePage.bld.getBuildingExt(t);
      }
      getBuildButton(t, e) {
        const i = this.manager.tab.children,
          s = this.getBuild(t),
          o = this._getBuildLabel(s.meta, e);
        for (const t in i) {
          if (-1 !== i[t].model.name.indexOf(o)) return i[t];
        }
        return null;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.ReligionManager = void 0);
    const s = i(8),
      o = i(5),
      a = i(7),
      n = i(6);
    e.ReligionManager = class {
      constructor(t) {
        (this._host = t),
          (this.manager = new a.TabManager(this._host, "Religion")),
          (this._crafts = new o.CraftManager(this._host)),
          (this._bulkManager = new s.BulkManager(this._host));
      }
      build(t, e, i) {
        const s = this.getBuild(t, e);
        if (null === s) throw new Error(`Unable to build '${t}'. Build information not available.`);
        const o = this.getBuildButton(t, e);
        if (!o || !o.model.enabled) return;
        const a = i,
          r = s.label;
        (i = this._bulkManager.construct(o.model, o, i)) !== a &&
          this._host.warning(`${r} Amount ordered: ${a} Amount Constructed: ${i}`),
          e === n.UnicornItemVariant.OrderOfTheSun
            ? (this._host.storeForSummary(r, i, "faith"),
              1 === i
                ? this._host.iactivity("act.sun.discover", [r], "ks-faith")
                : this._host.iactivity("act.sun.discovers", [r, i], "ks-faith"))
            : (this._host.storeForSummary(r, i, "build"),
              1 === i
                ? this._host.iactivity("act.build", [r], "ks-build")
                : this._host.iactivity("act.builds", [r, i], "ks-build"));
      }
      getBuild(t, e) {
        var i, s, o;
        switch (e) {
          case n.UnicornItemVariant.Ziggurat:
            return null !== (i = this._host.gamePage.religion.getZU(t)) && void 0 !== i ? i : null;
          case n.UnicornItemVariant.OrderOfTheSun:
            return null !== (s = this._host.gamePage.religion.getRU(t)) && void 0 !== s ? s : null;
          case n.UnicornItemVariant.Cryptotheology:
            return null !== (o = this._host.gamePage.religion.getTU(t)) && void 0 !== o ? o : null;
        }
        return null;
      }
      getBuildButton(t, e) {
        let i;
        switch (e) {
          case n.UnicornItemVariant.Ziggurat:
            i = this.manager.tab.zgUpgradeButtons;
            break;
          case n.UnicornItemVariant.OrderOfTheSun:
            i = this.manager.tab.rUpgradeButtons;
            break;
          case n.UnicornItemVariant.Cryptotheology:
            i = this.manager.tab.children[0].children[0].children;
            break;
          default:
            throw new Error(`Invalid variant '${e}'`);
        }
        const s = this.getBuild(t, e);
        if (null === s) throw new Error(`Unable to retrieve build information for '${t}'`);
        for (const t of i) {
          if (-1 !== t.model.name.indexOf(s.label)) return t;
        }
        return null;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.SpaceManager = void 0);
    const s = i(8),
      o = i(5),
      a = i(7);
    e.SpaceManager = class {
      constructor(t) {
        (this._host = t),
          (this.manager = new a.TabManager(this._host, "Space")),
          (this._crafts = new o.CraftManager(this._host)),
          (this._bulkManager = new s.BulkManager(this._host));
      }
      build(t, e) {
        const i = this.getBuild(t),
          s = this.getBuildButton(t);
        if (!(i.unlocked && s && s.model.enabled && this._host.options.auto.space.items[t].enabled))
          return;
        const o = e,
          a = i.label;
        (e = this._bulkManager.construct(s.model, s, e)) !== o &&
          this._host.warning(`${a} Amount ordered: ${o} Amount Constructed: ${e}`),
          this._host.storeForSummary(a, e, "build"),
          1 === e
            ? this._host.iactivity("act.build", [a], "ks-build")
            : this._host.iactivity("act.builds", [a, e], "ks-build");
      }
      getBuild(t) {
        return this._host.gamePage.space.getBuilding(t);
      }
      getBuildButton(t) {
        const e = this.manager.tab.planetPanels;
        for (const i in e)
          for (const s in e[i].children) if (e[i].children[s].id === t) return e[i].children[s];
        return null;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.TimeManager = void 0);
    const s = i(8),
      o = i(5),
      a = i(7),
      n = i(6);
    e.TimeManager = class {
      constructor(t) {
        (this._host = t),
          (this.manager = new a.TabManager(this._host, "Time")),
          (this._crafts = new o.CraftManager(this._host)),
          (this._bulkManager = new s.BulkManager(this._host));
      }
      build(t, e, i) {
        const s = this.getBuild(t, e);
        if (null === s) throw new Error(`Unable to build '${t}'. Build information not available.`);
        const o = this.getBuildButton(t, e);
        if (!o || !o.model.enabled) return;
        const a = i,
          n = s.label;
        (i = this._bulkManager.construct(o.model, o, i)) !== a &&
          this._host.warning(`${n} Amount ordered: ${a} Amount Constructed: ${i}`),
          this._host.storeForSummary(n, i, "build"),
          1 === i
            ? this._host.iactivity("act.build", [n], "ks-build")
            : this._host.iactivity("act.builds", [n, i], "ks-build");
      }
      getBuild(t, e) {
        var i, s;
        return e === n.TimeItemVariant.Chronoforge
          ? null !== (i = this._host.gamePage.time.getCFU(t)) && void 0 !== i
            ? i
            : null
          : null !== (s = this._host.gamePage.time.getVSU(t)) && void 0 !== s
          ? s
          : null;
      }
      getBuildButton(t, e) {
        let i;
        i =
          e === n.TimeItemVariant.Chronoforge
            ? this.manager.tab.children[2].children[0].children
            : this.manager.tab.children[3].children[0].children;
        const s = this.getBuild(t, e);
        if (null === s) throw new Error(`Unable to retrieve build information for '${t}'`);
        for (const t of i) {
          if (-1 !== t.model.name.indexOf(s.label)) return t;
        }
        return null;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.TradeManager = void 0);
    const s = i(5),
      o = i(7),
      a = i(1),
      n = i(2),
      r = i(0);
    e.TradeManager = class {
      constructor(t) {
        (this._host = t),
          (this.manager = new o.TabManager(this._host, "Trade")),
          (this._craftManager = new s.CraftManager(this._host));
      }
      trade(t, e) {
        (!t || 1 > e) &&
          this._host.warning(
            "KS trade checks are not functioning properly, please create an issue on the github page."
          );
        const i = this.getRace(t);
        (this.getTradeButton(i.name).model.enabled &&
          this._host.options.auto.trade.items[t].enabled) ||
          this._host.warning(
            "KS trade checks are not functioning properly, please create an issue on the github page."
          ),
          this._host.gamePage.diplomacy.tradeMultiple(i, e),
          this._host.storeForSummary(i.title, e, "trade"),
          this._host.iactivity("act.trade", [e, n.ucfirst(i.title)], "ks-trade");
      }
      getProfitability(t) {
        const e = this.getRace(t);
        let i = 0;
        const s = this.getMaterials(t);
        for (const [t, e] of a.objectEntries(s)) {
          const s = this._craftManager.getTickVal(this._craftManager.getResource(t));
          if ("ignore" !== s) {
            if (s <= 0) return !1;
            i += e / s;
          }
        }
        let o = 0;
        const n = this.getAverageTrade(e);
        for (const [t, e] of a.objectEntries(n)) {
          const i = this._craftManager.getResource(t),
            s = this._craftManager.getTickVal(i);
          if ("ignore" !== s) {
            if (s <= 0) return !0;
            o += 0 < i.maxValue ? Math.min(e, Math.max(i.maxValue - i.value, 0)) / s : e / s;
          }
        }
        return i <= o;
      }
      getAverageTrade(t) {
        const e =
            this._host.gamePage.getEffect("standingRatio") +
            this._host.gamePage.diplomacy.calculateStandingFromPolicies(
              t.name,
              this._host.gamePage
            ),
          i = 1 + 0.02 * t.energy,
          s =
            1 +
            this._host.gamePage.diplomacy.getTradeRatio() +
            this._host.gamePage.diplomacy.calculateTradeBonusFromPolicies(
              t.name,
              this._host.gamePage
            ),
          o = t.standing < 0 ? t.standing + e : 0,
          a = 0 < o ? 1 + o : 1,
          n = 0 < t.standing ? Math.min(t.standing + e / 2, 1) : 0,
          r = {};
        for (const e of t.sells) {
          if (!this._isValidTrade(e, t)) continue;
          let o = 0;
          const l = t.embassyPrices
            ? e.chance * (1 + this._host.gamePage.getLimitedDR(0.01 * t.embassyLevel, 0.75))
            : e.chance;
          if ("zebras" === t.name && "titanium" === e.name) {
            const t = this._host.gamePage.resPool.get("ship").value;
            o = 1.5 * (1 + t / 50) * (a * Math.min(0.15 + 0.0035 * t, 1));
          } else {
            const t = e.seasons
              ? 1 + e.seasons[this._host.gamePage.calendar.getCurSeason().name]
              : 1;
            o =
              ((a - n) * Math.min(l / 100, 1) + 1.25 * (n * Math.min(l / 100, 1))) *
              e.value *
              i *
              t *
              s;
          }
          r[e.name] = o;
        }
        const l = t.embassyPrices ? 0.35 * (1 + 0.01 * t.embassyLevel) : 0.35,
          h = a * Math.min(l, 1);
        return (r.spice = 25 * h + (50 * h * s) / 2), (r.blueprint = 0.1 * a), r;
      }
      _isValidTrade(t, e) {
        return (
          !(t.minLevel && e.embassyLevel < t.minLevel) &&
          (this._host.gamePage.resPool.get(t.name).unlocked ||
            "titanium" === t.name ||
            "uranium" === t.name ||
            "leviathans" === e.name)
        );
      }
      getLowestTradeAmount(t, e, i) {
        let s = void 0;
        const o = this.getMaterials(t);
        let n = void 0;
        for (const [t, i] of a.objectEntries(o))
          (n =
            "manpower" === t
              ? this._craftManager.getValueAvailable(t, !0) / i
              : this._craftManager.getValueAvailable(t, e, this._host.options.auto.trade.trigger) /
                i),
            (s = void 0 === s || n < s ? n : s);
        if (((s = Math.floor(null != s ? s : 0)), 0 === s)) return 0;
        if (null === t || "leviathans" === t) return s;
        const l = this.getRace(t);
        let h = 0;
        const c = this.getAverageTrade(l);
        for (const t of l.sells) {
          const e = this._craftManager.getResource(t.name);
          let i = 0;
          if (!e.maxValue) continue;
          i = r.mustExist(c[t.name]);
          const s = Math.max((e.maxValue - e.value) / i, 0);
          h = s < h ? h : s;
        }
        return (
          (h = Math.ceil(h)), 0 === h ? 0 : ((s = h < s ? Math.max(h - 1, 1) : s), Math.floor(s))
        );
      }
      getMaterials(t = null) {
        const e = {
          manpower: 50 - this._host.gamePage.getEffect("tradeCatpowerDiscount"),
          gold: 15 - this._host.gamePage.getEffect("tradeGoldDiscount"),
        };
        if (r.isNil(t)) return e;
        const i = this.getRace(t).buys;
        for (const t of i) e[t.name] = t.val;
        return e;
      }
      getRace(t) {
        const e = this._host.gamePage.diplomacy.get(t);
        if (r.isNil(e)) throw new Error(`Unable to retrieve race '${t}'`);
        return e;
      }
      getTradeButton(t) {
        const e = this.manager.tab.racePanels.find(e => e.race.name === t);
        if (r.isNil(e)) throw new Error(`Unable to find trade button for '${t}'`);
        return e.tradeBtn;
      }
      singleTradePossible(t) {
        const e = this.getMaterials(t);
        for (const [t, i] of a.objectEntries(e))
          if (this._craftManager.getValueAvailable(t, !0) < i) return !1;
        return !0;
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.UpgradeManager = void 0);
    const s = i(8),
      o = i(5),
      a = i(7);
    e.UpgradeManager = class {
      constructor(t) {
        (this._host = t),
          (this.scienceManager = new a.TabManager(this._host, "Science")),
          (this.spaceManager = new a.TabManager(this._host, "Space")),
          (this.workshopManager = new a.TabManager(this._host, "Workshop")),
          (this._crafts = new o.CraftManager(this._host)),
          (this._bulkManager = new s.BulkManager(this._host));
      }
      build(t, e) {
        const i = this.getBuildButton(t, e);
        if (!i || !i.model.enabled) return;
        i.domNode.click();
        const s = t.label;
        "workshop" === e
          ? (this._host.storeForSummary(s, 1, "upgrade"),
            this._host.iactivity("upgrade.upgrade", [s], "ks-upgrade"))
          : (this._host.storeForSummary(s, 1, "research"),
            this._host.iactivity("upgrade.tech", [s], "ks-research"));
      }
      getBuildButton(t, e) {
        let i;
        if ("workshop" === e) i = this.workshopManager.tab.buttons;
        else {
          if ("science" !== e) throw new Error(`Unexpected variant '${e}'`);
          i = this.scienceManager.tab.buttons;
        }
        for (const e in i) {
          if (i[e].model.name === t.label) return i[e];
        }
        return null;
      }
    };
  },
  function (t) {
    t.exports = JSON.parse(
      '{"en":{"option.observe":"Observe Astro Events","option.festival":"Hold Festivals","option.praise":"Auto Praise","option.shipOverride":"Force Ships to 243","option.autofeed":"Feed Leviathans","option.hunt":"Hunt","option.crypto":"Trade Blackcoin","option.embassies":"Build Embassies (Beta)","option.style":"View Full Width","option.steamworks":"Turn on Steamworks","filter.build":"Building","filter.craft":"Crafting","filter.upgrade":"Upgrading","filter.research":"Researching","filter.trade":"Trading","filter.hunt":"Hunting","filter.praise":"Praising","filter.faith":"Order of the Sun","filter.festival":"Festivals","filter.star":"Astronomical Events","filter.misc":"Miscellaneous","dispose.necrocorn":"Kittens disposed of inefficient necrocorns","blackcoin.buy":"Kittens sold your Relics and bought {0} Blackcoins","blackcoin.sell":"Kittens sold your Blackcoins and bought {0} Relics","act.feed":"Kittens fed the Elders. The elders are pleased","act.observe":"Kitten Scientists have observed a star","act.hunt":"Sent kittens on {0} hunts","act.build":"Kittens have built a new {0}","act.builds":"Kittens have built a new {0} {1} times.","act.craft":"Kittens have crafted {0} {1}","act.trade":"Kittens have traded {0}x with {1}","upgrade.space.mission":"Kittens conducted a mission to {0}","upgrade.space":"Kittens conducted a {0}","upgrade.race":"Kittens met the {0}","upgrade.building.pasture":"Upgraded pastures to solar farms!","upgrade.building.aqueduct":"Upgraded aqueducts to hydro plants!","upgrade.building.library":"Upgraded libraries to data centers!","upgrade.building.amphitheatre":"Upgraded amphitheatres to broadcast towers!","upgrade.upgrade":"Kittens have bought the upgrade {0}","upgrade.tech":"Kittens have bought the tech {0}","festival.hold":"Kittens begin holding a festival","festival.extend":"Kittens extend the festival","build.embassy":"Built {0} embassy for {1}","build.embassies":"Built {0} embassies for {1}","act.praise":"Praised the sun! Accumulated {0} faith to {1} worship","act.sun.discover":"Kittens have discovered {0}","act.sun.discovers":"Kittens have discovered {0} {1} times.","ui.items":"items","ui.disable.all":"disable all","ui.enable.all":"enable all","ui.craft.resources":"resources","ui.trigger":"trigger","ui.trigger.set":"Enter a new trigger value for {0}. Should be in the range of 0 to 1.","ui.limit":"Limited","ui.trigger.crypto.set":"Enter a new trigger value for {0}. Corresponds to the amount of Relics needed before the exchange is made.","ui.engine":"Enable Scientists","ui.build":"Bonfire","ui.space":"Space","ui.craft":"Crafting","ui.upgrade":"Unlocking","ui.trade":"Trading","ui.faith":"Religion","ui.time":"Time","ui.options":"Options","ui.filter":"Filters","ui.distribute":"Kitten Resources","ui.max":"Max: {0}","ui.upgrade.upgrades":"Upgrades","ui.upgrade.techs":"Techs","ui.upgrade.races":"Races","ui.upgrade.missions":"Missions","ui.upgrade.buildings":"Buildings","ui.faith.addtion":"addition","option.faith.best.unicorn":"Build Best Unicorn Building First","option.faith.best.unicorn.desc":"Include auto Sacrifice Unicorns if tears are not enough to build the best unicorn building","option.faith.transcend":"Auto Transcend","act.transcend":"Spend {0} epiphany, Transcend to T-level: {1}","summary.transcend":"Transcend {0} times","filter.transcend":"Transcend","option.faith.adore":"Auto Adore the Galaxy","act.adore":"Adore the galaxy! Accumulated {0} worship to {1} epiphany","summary.adore":"Accumulated {0} epiphany by adore the galaxy","filter.adore":"Adoring","adore.trigger.set":"Enter a new trigger value for AutoAdore. Should be in the range of 0 to 1.\\nKS will AutoAdore if the Solor Revolutuin Bonus brought by praising the sun once after adore can reach the trigger of maximum.\\n\\nNote: The solar revolution bonus will diminish after reaching 75% of the maximum.","resources.add":"add resources","resources.clear.unused":"clear unused","resources.stock":"Stock: {0}","resources.consume":"Comsume: {0}","resources.del":"del","resources.stock.set":"Stock for {0}","resources.consume.set":"Consume rate for {0}","resources.del.confirm":"Delete resource controls for {0}?","status.ks.enable":"Enabling the kitten scientists!","status.ks.disable":"Disabling the kitten scientists!","status.sub.enable":"Enabled {0}","status.auto.enable":"Enable Auto {0}","status.sub.disable":"Disabled {0}","status.auto.disable":"Disable Auto {0}","trade.limited":"Trading with {0}: limited to only occur when profitable based off relative production time","trade.unlimited":"Trading with {0}: unlimited","trade.seasons":"seasons","trade.season.enable":"Enabled trading with {0} in the {1}","trade.season.disable":"Disabled trading with {0} in the {1}","filter.enable":"Enable {0} Filter","filter.disable":"Disabled {0} Filter","craft.limited":"Crafting {0}: limited to be proportional to cost ratio","craft.unlimited":"Crafting {0}: unlimited","distribute.limited":"Distribute to {0}: stop when reach max","distribute.unlimited":"Distribute to {0}: unlimited","act.distribute":"Distribute a kitten to {0}","ui.max.set":"Maximum for {0}","summary.distribute":"Help {0} kittens to find job","filter.distribute":"Distribute","option.promote":"Promote Leader","act.promote":"Kittens\\" leader has been promoted to rank {0}","filter.promote":"Promote leader","summary.promote":"Promoted leader {0} times","ui.timeCtrl":"Time Control","option.accelerate":"Tempus Fugit","act.accelerate":"Accelerate time!","filter.accelerate":"Tempus Fugit","summary.accelerate":"Accelerate time {0} times","option.time.skip":"Time Skip","act.time.skip":"Kittens combuste Time crystal, {0} years skiped!","ui.cycles":"cycles","ui.maximum":"Maximum","time.skip.cycle.enable":"Enable time skip in cycle {0} and allow skip over this cycle","time.skip.cycle.disable":"Disable time skip in cycle {0} and disallow skip over this cycle","time.skip.season.enable":"Enable time skip in the {0}","time.skip.season.disable":"Disable time skip in the {0}","time.skip.trigger.set":"Enter a new trigger value for Time Skip (Combust time crystal). Should be a positive integer.","summary.time.skip":"Skip {0} years","filter.time.skip":"Time Skip","option.time.reset":"Reset Timeline (Danger!)","status.reset.check.enable":"Enable check {0} before Reset Timeline","status.reset.check.disable":"Disable check {0} before Reset Timeline","ui.min":"Min: {0}","reset.check.trigger.set":"Enter a new trigger value for {0}.\\n-1 meaning must build this building until exceeding resource limit.","reset.check":"Trigger for {0} : {1}, you have {2}","reset.checked":"All conditions are met, the timeline will restart in next few seconds!","reset.tip":"You can cancel this reset by disable \\"Kitten Scientists\\" or \\"Time Control\\" or \\"Reset Timeline\\"","reset.countdown.10":"10 - Harvesting catnip","reset.countdown.9":"&nbsp;9 - Sacrificing Unicorns","reset.countdown.8":"&nbsp;8 - Releasing lizards","reset.countdown.7":"&nbsp;7 - Disassembling railguns","reset.countdown.6":"&nbsp;6 - Starting time engines","reset.countdown.5":"&nbsp;5 - Melting blackcoins","reset.countdown.4":"&nbsp;4 - Turning off satellite","reset.countdown.3":"&nbsp;3 - Opening temporal rifts","reset.countdown.2":"&nbsp;2 - Boosting the chronoforge","reset.countdown.1":"&nbsp;1 - Time engine start","reset.countdown.0":"&nbsp;0 - Temporal rifts opened!","reset.last.message":"See you next poincaré recurrence","reset.after":"Nice to meet you, the cute Kittens Scientists will serve you","reset.cancel.message":"Timeline Reset canceled.","reset.cancel.activity":"Meoston, We Have a Problem.","summary.time.reset.title":"Summary of the last {0} timelines","summary.time.reset.content":"Gain {0} Karma.<br>Gain {1} Paragon.","ui.close":"close","option.fix.cry":"Fix Cryochamber","act.fix.cry":"Kittens fix {0} Cryochambers","summary.fix.cry":"Fix {0} Cryochambers","summary.festival":"Held {0} festivals","summary.stars":"Observed {0} stars","summary.praise":"Accumulated {0} worship by praising the sun","summary.hunt":"Sent adorable kitten hunters on {0} hunts","summary.embassy":"Built {0} embassies","summary.feed":"Fed the elders {0} necrocorns","summary.tech":"Researched: {0}","summary.upgrade":"Upgraded: {0}","summary.building":"Built: +{0} {1}","summary.sun":"Discovered: +{0} {1}","summary.craft":"Crafted: +{0} {1}","summary.trade":"Traded: {0}x {1}","summary.year":"year","summary.years":"years","summary.separator":" and ","summary.day":"day","summary.days":"days","summary.head":"Summary of the last {0}","summary.show":"Show activity"},"zh":{"option.observe":"观测天文事件","option.festival":"举办节日","option.praise":"赞美太阳","option.shipOverride":"强制243船","option.autofeed":"献祭上古神","option.hunt":"狩猎","option.crypto":"黑币交易","option.embassies":"建造大使馆 (Beta)","option.style":"占满屏幕","option.steamworks":"启动蒸汽工房","filter.build":"建筑","filter.craft":"工艺","filter.upgrade":"升级","filter.research":"研究","filter.trade":"贸易","filter.hunt":"狩猎","filter.praise":"赞美太阳","filter.faith":"太阳秩序","filter.festival":"节日","filter.star":"天文事件","filter.misc":"杂项","dispose.necrocorn":"小猫处理掉了影响效率的多余死灵兽","blackcoin.buy":"小猫出售遗物并买入 {0} 黑币","blackcoin.sell":"小猫出售黑币并买入了 {0} 遗物","act.feed":"小猫向上古神献上祭品。上古神很高兴","act.observe":"小猫珂学家观测到一颗流星","act.hunt":"派出 {0} 波小猫去打猎","act.build":"小猫建造了一个 {0}","act.builds":"小猫建造了 {1} 个新的 {0}","act.craft":"小猫制作了 {0} {1}","act.trade":"小猫与 {1} 交易 {0} 次","upgrade.space.mission":"小猫执行了 {0} 的任务","upgrade.space":"小猫执行了 {0}","upgrade.race":"小猫遇到了 {0}","upgrade.building.pasture":"牧场 升级为 太阳能发电站 !","upgrade.building.aqueduct":"水渠 升级为 水电站 !","upgrade.building.library":"图书馆 升级为 数据中心!","upgrade.building.amphitheatre":"剧场 升级为 广播塔!","upgrade.upgrade":"小猫发明了 {0}","upgrade.tech":"小猫掌握了 {0}","festival.hold":"小猫开始举办节日","festival.extend":"小猫延长了节日","build.embassy":"在 {1} 设立了 {0} 个大使馆","build.embassies":"在 {1} 设立了 {0} 个大使馆","act.praise":"赞美太阳! 转化 {0} 信仰为 {1} 虔诚","act.sun.discover":"小猫在 {0} 方面获得顿悟","act.sun.discovers":"小猫在 {0} 方面获得 {1} 次顿悟","ui.items":"项目","ui.disable.all":"全部禁用","ui.enable.all":"全部启用","ui.craft.resources":"资源","ui.trigger":"触发条件","ui.trigger.set":"输入新的 {0} 触发值，取值范围为 0 到 1 的小数。","ui.limit":"限制","ui.trigger.crypto.set":"输入一个新的 {0} 触发值,\\n遗物数量达到触发值时会进行黑笔交易。","ui.engine":"启用小猫珂学家","ui.build":"营火","ui.space":"太空","ui.craft":"工艺","ui.upgrade":"升级","ui.trade":"贸易","ui.faith":"宗教","ui.time":"时间","ui.options":"选项","ui.filter":"日志过滤","ui.distribute":"猫力资源","ui.max":"Max: {0}","ui.upgrade.upgrades":"升级","ui.upgrade.techs":"科技","ui.upgrade.races":"探险队出发!","ui.upgrade.missions":"探索星球","ui.upgrade.buildings":"建筑","ui.faith.addtion":"附加","option.faith.best.unicorn":"优先最佳独角兽建筑","option.faith.best.unicorn.desc":"当眼泪不够建造最佳独角兽建筑时也会自动献祭独角兽","option.faith.transcend":"自动超越","act.transcend":"消耗 {0} 顿悟，达到超越 {1}","summary.transcend":"超越了 {0} 次","filter.transcend":"超越","option.faith.adore":"赞美群星","act.adore":"赞美群星! 转化 {0} 虔诚为 {1} 顿悟","summary.adore":"通过赞美群星积累了 {0} 顿悟","filter.adore":"赞美群星","adore.trigger.set":"为自动赞美群星设定一个新触发值，取值范围为 0 到 1 的小数。\\n如果赞美群星后第一次赞美太阳可将太阳革命加成恢复到(触发值*太阳革命太阳革命极限加成)，那么珂学家将自动赞美群星。\\n\\n注意：太阳革命加成在到达上限的75%后便会收益递减。","resources.add":"添加资源","resources.clear.unused":"清除未使用","resources.stock":"库存: {0}","resources.consume":"消耗率: {0}","resources.del":"删除","resources.stock.set":"设置 {0} 的库存","resources.consume.set":"设置 {0} 的消耗率","resources.del.confirm":"确定要取消 {0} 的库存控制?","status.ks.enable":"神说，要有猫猫珂学家!","status.ks.disable":"太敬业了，该歇了","status.sub.enable":"启用 {0}","status.auto.enable":"启用自动化 {0}","status.sub.disable":"禁用 {0}","status.auto.disable":"禁用自动化 {0}","trade.limited":"与 {0} 的交易限制为比产量更优时才会触发","trade.unlimited":"取消与 {0} 交易的限制","trade.seasons":"季节","trade.season.enable":"启用在 {1} 与 {0} 的交易","trade.season.disable":"停止在 {1} 与 {0} 的交易","filter.enable":"过滤 {0}","filter.disable":"取消过滤 {0}","craft.limited":"制作 {0} 受库存消耗比率的限制","craft.unlimited":"制作 {0} 不受限制","distribute.limited":"分配 {0} 受限于最大值","distribute.unlimited":"分配 {0} 不受限","act.distribute":"分配一只猫猫成为 {0}","ui.max.set":"设置 {0} 的最大值","summary.distribute":"帮助 {0} 只猫猫找到工作","filter.distribute":"猫口分配","option.promote":"提拔领袖","act.promote":"领袖被提拔到 {0} 级","filter.promote":"提拔领袖","summary.promote":"提拔领袖 {0} 次","ui.timeCtrl":"时间操纵","option.accelerate":"时间加速","act.accelerate":"固有时制御，二倍速!","filter.accelerate":"时间加速","summary.accelerate":"加速时间 {0} 次","option.time.skip":"时间跳转","act.time.skip":"燃烧时间水晶, 跳过接下来的 {0} 年!","ui.cycles":"周期","ui.maximum":"上限","time.skip.cycle.enable":"启用在 {0} 跳转时间并允许跳过该周期","time.skip.cycle.disable":"停止在 {0} 跳转时间并禁止跳过该周期","time.skip.season.enable":"启用在 {0} 跳转时间","time.skip.season.disable":"停止在 {0} 跳转时间","time.skip.trigger.set":"为跳转时间(燃烧时间水晶)设定一个新触发值，取值范围为正整数","summary.time.skip":"跳过 {0} 年","filter.time.skip":"时间跳转","option.time.reset":"重启时间线 (危险!)","status.reset.check.enable":"在重启时间线前检查 {0}","status.reset.check.disable":"在重启时间线前不检查 {0}","ui.min":"Min: {0}","reset.check.trigger.set":"为 {0} 设置新的触发值.\\n-1 表示必须将此建筑建造至超过资源上限为止","reset.check":"{0} 的触发值: {1}, 现在共有 {2}","reset.checked":"所有条件都已满足，时间线将在几秒后重启!","reset.tip":"你可以通过取消 \\"启用小猫珂学家\\" 或 \\"时间操控\\" 或 \\"重启时间线\\" 以取消此次重启","reset.countdown.10":"10 - 正在收获猫薄荷","reset.countdown.9":"&nbsp;9 - 正在献祭独角兽","reset.countdown.8":"&nbsp;8 - 正在放生蜥蜴","reset.countdown.7":"&nbsp;7 - 正在拆解电磁炮","reset.countdown.6":"&nbsp;6 - 正在启动时间引擎","reset.countdown.5":"&nbsp;5 - 正在融化黑币","reset.countdown.4":"&nbsp;4 - 正在关闭卫星","reset.countdown.3":"&nbsp;3 - 正在打开时空裂隙","reset.countdown.2":"&nbsp;2 - 正在启动时间锻造","reset.countdown.1":"&nbsp;1 - 时间引擎已启动!","reset.countdown.0":"&nbsp;0 - 时空裂缝已打开!","reset.last.message":"我们下个庞加莱回归再见","reset.after":"初次见面，可爱的猫猫科学家为您服务","reset.cancel.message":"重启时间线计划取消.","reset.cancel.activity":"喵斯顿，我们有麻烦了.","summary.time.reset.title":"过去 {0} 个时间线的总结","summary.time.reset.content":"获得 {0} 业.<br>获得 {1} 领导力.","ui.close":"关闭","option.fix.cry":"修复冷冻仓","act.fix.cry":"小猫修复了 {0} 个冷冻仓","summary.fix.cry":"修复了 {0} 个冷冻仓","summary.festival":"举办了 {0} 次节日","summary.stars":"观测了 {0} 颗流星","summary.praise":"通过赞美太阳积累了 {0} 虔诚","summary.hunt":"派出了 {0} 批可爱的小猫猎人","summary.embassy":"设立了 {0} 个大使馆","summary.feed":"向上古神献祭 {0} 只死灵兽","summary.tech":"掌握了 {0}","summary.upgrade":"发明了 {0}","summary.building":"建造了 {0} 个 {1}","summary.sun":"在 {1} 方面顿悟 {0} 次","summary.craft":"制作了 {0} 个 {1}","summary.trade":"与 {1} 贸易了 {0} 次","summary.year":"年","summary.years":"年","summary.separator":" ","summary.day":"天","summary.days":"天","summary.head":"过去 {0} 的总结","summary.show":"总结"}}'
    );
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.sleep = void 0),
      (e.sleep = function (t) {
        return new Promise(e => setTimeout(e, t));
      });
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.UserInterface = void 0);
    const s = i(45),
      o = i(46),
      a = i(47),
      n = i(48),
      r = i(49),
      l = i(50),
      h = i(51),
      c = i(52),
      g = i(53),
      u = i(54),
      d = i(55),
      m = i(56);
    e.UserInterface = class {
      constructor(t) {
        (this._host = t),
          (this._engineUi = new n.EngineSettingsUi(this._host)),
          (this._bonfireUi = new s.BonfireSettingsUi(this._host)),
          (this._spaceUi = new c.SpaceSettingsUi(this._host)),
          (this._craftUi = new o.CraftSettingsUi(this._host)),
          (this._unlockUi = new m.UnlockingSettingsUi(this._host)),
          (this._tradingUi = new d.TradingSettingsUi(this._host)),
          (this._religionUi = new h.ReligionSettingsUi(this._host)),
          (this._timeUi = new u.TimeSettingsUi(this._host)),
          (this._timeCtrlUi = new g.TimeControlSettingsUi(this._host)),
          (this._distributeUi = new a.DistributeSettingsUi(this._host)),
          (this._optionsUi = new l.OptionsSettingsUi(this._host)),
          (this._filterUi = new r.FiltersSettingsUi(this._host));
      }
      construct() {
        this._installCss();
        const t = $("<div/>", { id: "ks-options", css: { marginBottom: "10px" } }),
          e = $("<ul/>"),
          i = $("<div/>", {
            css: { bottomBorder: "1px solid gray", marginBottom: "5px" },
            text: "Kitten Scientists v2.0.0-alpha1",
          });
        t.append(i),
          e.append(this._engineUi.element),
          e.append(this._bonfireUi.element),
          e.append(this._spaceUi.element),
          e.append(this._craftUi.element),
          e.append(this._unlockUi.element),
          e.append(this._tradingUi.element),
          e.append(this._religionUi.element),
          e.append(this._timeUi.element),
          e.append(this._timeCtrlUi.element),
          e.append(this._distributeUi.element),
          e.append(this._optionsUi.element),
          e.append(this._filterUi.element);
        const s = $("<div/>", {
            id: "activity-box",
            css: { display: "inline-block", verticalAlign: "top" },
          }),
          o = $("<a/>", {
            id: "showActivityHref",
            text: this._host.i18n("summary.show"),
            href: "#",
            css: { verticalAlign: "top" },
          });
        o.on("click", () => this._host.displayActivitySummary()),
          s.append(o),
          $("#clearLog").append(s);
        const a = $("<div/>", {
            id: "important-msg-box",
            class: "dialog help",
            css: { display: "none", width: "auto", height: "auto" },
          }),
          n = $("<a/>", {
            text: this._host.i18n("ui.close"),
            href: "#",
            css: { position: "absolute", top: "10px", right: "15px" },
          });
        n.on("click", function () {
          a.toggle();
        });
        const r = $("<h1/>", { id: "mb-title", text: "test text" }),
          l = $("<h1/>", { id: "mb-content", text: "test text" });
        a.append(n, r, l), $("#gamePageContainer").append(a);
        $("#rightColumn").prepend(t.append(e));
      }
      setState(t) {
        this._engineUi.setState(t.auto.engine),
          this._bonfireUi.setState(t.auto.build),
          this._spaceUi.setState(t.auto.space),
          this._craftUi.setState(t.auto.craft),
          this._unlockUi.setState(t.auto.unlock),
          this._tradingUi.setState(t.auto.trade),
          this._religionUi.setState(t.auto.religion),
          this._timeUi.setState(t.auto.time),
          this._timeCtrlUi.setState(t.auto.timeCtrl),
          this._distributeUi.setState(t.auto.distribute),
          this._optionsUi.setState(t.auto.options),
          this._filterUi.setState(t.auto.filters);
      }
      refreshUi() {
        this._engineUi.refreshUi(),
          this._bonfireUi.refreshUi(),
          this._spaceUi.refreshUi(),
          this._craftUi.refreshUi(),
          this._unlockUi.refreshUi(),
          this._tradingUi.refreshUi(),
          this._religionUi.refreshUi(),
          this._timeUi.refreshUi(),
          this._timeCtrlUi.refreshUi(),
          this._distributeUi.refreshUi(),
          this._optionsUi.refreshUi(),
          this._filterUi.refreshUi();
      }
      _installCss() {
        const t = "body[data-ks-style]:not(.scheme_sleek)";
        this._addRule("body {font-family: monospace;font-size: 12px;}"),
          this._addRule(t + " #game {min-width: 1300px;top: 32px;}"),
          this._addRule(
            t +
              " .column {min-height: inherit;max-width: inherit !important;padding: 1%;margin: 0;overflow-y: auto;}"
          ),
          this._addRule(t + " #leftColumn {height: 92%;width: 26%;}"),
          this._addRule(t + " #midColumn {margin-top: 1% !important;height: 90%;width: 48%;}"),
          this._addRule(t + " #rightColumn {overflow-y: auto;height: 92%;width: 19%;}"),
          this._addRule("body #gamePageContainer #game #rightColumn {overflow-y: auto}"),
          this._addRule(
            t +
              " #gameLog {overflow-y: hidden !important;width: 100% !important;padding-top: 5px !important;}"
          ),
          this._addRule(t + " #resContainer .maxRes {color: #676766;}"),
          this._addRule(
            t +
              " #game .btn {border-radius: 0px;font-family: monospace;font-size: 12px !important;margin: 0 5px 7px 0;width: 290px;}"
          ),
          this._addRule(
            t + " #game .map-viewport {height: 340px;max-width: 500px;overflow: visible;}"
          ),
          this._addRule(" #game .map-dashboard {height: 120px;width: 292px;}"),
          this._addRule("#ks-options ul {list-style: none;margin: 0 0 5px;padding: 0;}"),
          this._addRule(
            '#ks-options ul:after {clear: both;content: " ";display: block;height: 0;}'
          ),
          this._addRule("#ks-options ul li {display: block;float: left;width: 100%;}"),
          this._addRule(
            "#ks-options #toggle-list-resources .stockWarn *,#ks-options #toggle-reset-list-resources .stockWarn * {color: #DD1E00;}"
          ),
          this._addRule(".right-tab {height: unset !important;}");
      }
      _addRule(t) {
        document.styleSheets[0].insertRule(t, 0);
      }
    };
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.BonfireSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.build) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.build")),
          s = $("<li/>", { id: "ks-build" }),
          a = $("<label/>", { for: "toggle-build", text: i }),
          n = $("<input/>", { id: "toggle-build", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a),
          (this._triggerButton = $("<div/>", {
            id: "trigger-build",
            text: this._host.i18n("ui.trigger"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          (this._options.$trigger = this._triggerButton),
          this._triggerButton.on("click", () => {
            const t = window.prompt(
              this._host.i18n("ui.trigger.set", [i]),
              this._options.trigger.toString()
            );
            null !== t &&
              ((this._options.trigger = parseFloat(t)),
              (this._triggerButton[0].title = this._options.trigger.toFixed(2)));
          });
        const r = this.getOptionHead("build");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-build",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this._getLimitedOption(
              "hut",
              this._options.items.hut,
              this._host.i18n("$buildings.hut.label")
            ),
            this._getLimitedOption(
              "logHouse",
              this._options.items.logHouse,
              this._host.i18n("$buildings.logHouse.label")
            ),
            this._getLimitedOption(
              "mansion",
              this._options.items.mansion,
              this._host.i18n("$buildings.mansion.label"),
              !0
            ),
            this._getLimitedOption(
              "workshop",
              this._options.items.workshop,
              this._host.i18n("$buildings.workshop.label")
            ),
            this._getLimitedOption(
              "factory",
              this._options.items.factory,
              this._host.i18n("$buildings.factory.label"),
              !0
            ),
            this._getLimitedOption(
              "field",
              this._options.items.field,
              this._host.i18n("$buildings.field.label")
            ),
            this._getLimitedOption(
              "pasture",
              this._options.items.pasture,
              this._host.i18n("$buildings.pasture.label")
            ),
            this._getLimitedOption(
              "solarFarm",
              this._options.items.solarFarm,
              this._host.i18n("$buildings.solarfarm.label")
            ),
            this._getLimitedOption(
              "mine",
              this._options.items.mine,
              this._host.i18n("$buildings.mine.label")
            ),
            this._getLimitedOption(
              "lumberMill",
              this._options.items.lumberMill,
              this._host.i18n("$buildings.lumberMill.label")
            ),
            this._getLimitedOption(
              "aqueduct",
              this._options.items.aqueduct,
              this._host.i18n("$buildings.aqueduct.label")
            ),
            this._getLimitedOption(
              "hydroPlant",
              this._options.items.hydroPlant,
              this._host.i18n("$buildings.hydroplant.label")
            ),
            this._getLimitedOption(
              "oilWell",
              this._options.items.oilWell,
              this._host.i18n("$buildings.oilWell.label")
            ),
            this._getLimitedOption(
              "quarry",
              this._options.items.quarry,
              this._host.i18n("$buildings.quarry.label"),
              !0
            ),
            this._getLimitedOption(
              "smelter",
              this._options.items.smelter,
              this._host.i18n("$buildings.smelter.label")
            ),
            this._getLimitedOption(
              "biolab",
              this._options.items.biolab,
              this._host.i18n("$buildings.biolab.label")
            ),
            this._getLimitedOption(
              "calciner",
              this._options.items.calciner,
              this._host.i18n("$buildings.calciner.label")
            ),
            this._getLimitedOption(
              "reactor",
              this._options.items.reactor,
              this._host.i18n("$buildings.reactor.label")
            ),
            this._getLimitedOption(
              "accelerator",
              this._options.items.accelerator,
              this._host.i18n("$buildings.accelerator.label")
            ),
            this._getLimitedOption(
              "steamworks",
              this._options.items.steamworks,
              this._host.i18n("$buildings.steamworks.label")
            ),
            this._getLimitedOption(
              "magneto",
              this._options.items.magneto,
              this._host.i18n("$buildings.magneto.label"),
              !0
            ),
            this._getLimitedOption(
              "library",
              this._options.items.library,
              this._host.i18n("$buildings.library.label")
            ),
            this._getLimitedOption(
              "dataCenter",
              this._options.items.dataCenter,
              this._host.i18n("$buildings.dataCenter.label")
            ),
            this._getLimitedOption(
              "academy",
              this._options.items.academy,
              this._host.i18n("$buildings.academy.label")
            ),
            this._getLimitedOption(
              "observatory",
              this._options.items.observatory,
              this._host.i18n("$buildings.observatory.label"),
              !0
            ),
            this._getLimitedOption(
              "amphitheatre",
              this._options.items.amphitheatre,
              this._host.i18n("$buildings.amphitheatre.label")
            ),
            this._getLimitedOption(
              "broadcastTower",
              this._options.items.broadcastTower,
              this._host.i18n("$buildings.broadcasttower.label")
            ),
            this._getLimitedOption(
              "tradepost",
              this._options.items.tradepost,
              this._host.i18n("$buildings.tradepost.label")
            ),
            this._getLimitedOption(
              "chapel",
              this._options.items.chapel,
              this._host.i18n("$buildings.chapel.label")
            ),
            this._getLimitedOption(
              "temple",
              this._options.items.temple,
              this._host.i18n("$buildings.temple.label")
            ),
            this._getLimitedOption(
              "mint",
              this._options.items.mint,
              this._host.i18n("$buildings.mint.label")
            ),
            this._getLimitedOption(
              "ziggurat",
              this._options.items.ziggurat,
              this._host.i18n("$buildings.ziggurat.label")
            ),
            this._getLimitedOption(
              "chronosphere",
              this._options.items.chronosphere,
              this._host.i18n("$buildings.chronosphere.label")
            ),
            this._getLimitedOption(
              "aiCore",
              this._options.items.aiCore,
              this._host.i18n("$buildings.aicore.label")
            ),
            this._getLimitedOption(
              "brewery",
              this._options.items.brewery,
              this._host.i18n("$buildings.brewery.label"),
              !0
            ),
            this._getLimitedOption(
              "barn",
              this._options.items.barn,
              this._host.i18n("$buildings.barn.label")
            ),
            this._getLimitedOption(
              "harbor",
              this._options.items.harbor,
              this._host.i18n("$buildings.harbor.label")
            ),
            this._getLimitedOption(
              "warehouse",
              this._options.items.warehouse,
              this._host.i18n("$buildings.warehouse.label"),
              !0
            ),
            this._getLimitedOption(
              "zebraOutpost",
              this._options.items.zebraOutpost,
              this._host.i18n("$buildings.zebraOutpost.label")
            ),
            this._getLimitedOption(
              "zebraWorkshop",
              this._options.items.zebraWorkshop,
              this._host.i18n("$buildings.zebraWorkshop.label")
            ),
            this._getLimitedOption(
              "zebraForge",
              this._options.items.zebraForge,
              this._host.i18n("$buildings.zebraForge.label")
            ),
          ]),
          r.append(...this._optionButtons),
          s.append(this._itemsButton),
          s.append(this._triggerButton),
          s.append(r),
          (this.element = s);
      }
      _getLimitedOption(t, e, i, s = !1) {
        const o = this.getOption(t, e, i, s, {
            onCheck: () => {
              (e.enabled = !0), this._host.imessage("status.auto.enable", [i]);
            },
            onUnCheck: () => {
              (e.enabled = !1), this._host.imessage("status.auto.disable", [i]);
            },
          }),
          a = $("<div/>", {
            id: "set-" + t + "-max",
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }).data("option", e);
        return (
          (e.$max = a),
          a.on("click", () => {
            const t = window.prompt(this._host.i18n("ui.max.set", [i]), e.max.toString());
            null !== t &&
              ((e.max = parseInt(t)),
              (a[0].title = e.max.toString()),
              (a[0].innerText = this._host.i18n("ui.max", [e.max])));
          }),
          o.append(a),
          o
        );
      }
      setState(t) {
        (this._options.enabled = t.enabled), (this._options.trigger = t.trigger);
        for (const [e, i] of s.objectEntries(this._options.items))
          (i.enabled = t.items[e].enabled), (i.max = t.items[e].max);
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled),
          (a.mustExist(this._options.$trigger)[0].title = this._options.trigger.toFixed(2));
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", this._options.items[t].enabled),
            a.mustExist(e.$max).text(this._host.i18n("ui.max", [this._options.items[t].max]));
      }
    }
    e.BonfireSettingsUi = r;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.CraftSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.craft) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.craft")),
          s = $("<li/>", { id: "ks-craft" }),
          a = $("<label/>", { for: "toggle-craft", text: i }),
          n = $("<input/>", { id: "toggle-craft", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a),
          (this._triggerButton = $("<div/>", {
            id: "trigger-craft",
            text: this._host.i18n("ui.trigger"),
            title: this._options.trigger,
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          (this._options.$trigger = this._triggerButton),
          this._triggerButton.on("click", () => {
            const t = window.prompt(
              this._host.i18n("ui.trigger.set", [i]),
              this._options.trigger.toString()
            );
            null !== t &&
              ((this._options.trigger = parseFloat(t)),
              (this._triggerButton[0].title = this._options.trigger.toString()));
          });
        const r = this.getOptionHead("craft");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-craft",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this._getCraftOption(
              "wood",
              this._options.items.wood,
              this._host.i18n("$workshop.crafts.wood.label")
            ),
            this._getCraftOption(
              "beam",
              this._options.items.beam,
              this._host.i18n("$workshop.crafts.beam.label")
            ),
            this._getCraftOption(
              "slab",
              this._options.items.slab,
              this._host.i18n("$workshop.crafts.slab.label")
            ),
            this._getCraftOption(
              "steel",
              this._options.items.steel,
              this._host.i18n("$workshop.crafts.steel.label")
            ),
            this._getCraftOption(
              "plate",
              this._options.items.plate,
              this._host.i18n("$workshop.crafts.plate.label")
            ),
            this._getCraftOption(
              "alloy",
              this._options.items.alloy,
              this._host.i18n("$workshop.crafts.alloy.label")
            ),
            this._getCraftOption(
              "concrate",
              this._options.items.concrate,
              this._host.i18n("$workshop.crafts.concrate.label")
            ),
            this._getCraftOption(
              "gear",
              this._options.items.gear,
              this._host.i18n("$workshop.crafts.gear.label")
            ),
            this._getCraftOption(
              "scaffold",
              this._options.items.scaffold,
              this._host.i18n("$workshop.crafts.scaffold.label")
            ),
            this._getCraftOption(
              "ship",
              this._options.items.ship,
              this._host.i18n("$workshop.crafts.ship.label")
            ),
            this._getCraftOption(
              "tanker",
              this._options.items.tanker,
              this._host.i18n("$workshop.crafts.tanker.label"),
              !0
            ),
            this._getCraftOption(
              "parchment",
              this._options.items.parchment,
              this._host.i18n("$workshop.crafts.parchment.label")
            ),
            this._getCraftOption(
              "manuscript",
              this._options.items.manuscript,
              this._host.i18n("$workshop.crafts.manuscript.label")
            ),
            this._getCraftOption(
              "compedium",
              this._options.items.compedium,
              this._host.i18n("$workshop.crafts.compedium.label")
            ),
            this._getCraftOption(
              "blueprint",
              this._options.items.blueprint,
              this._host.i18n("$workshop.crafts.blueprint.label"),
              !0
            ),
            this._getCraftOption(
              "kerosene",
              this._options.items.kerosene,
              this._host.i18n("$workshop.crafts.kerosene.label")
            ),
            this._getCraftOption(
              "megalith",
              this._options.items.megalith,
              this._host.i18n("$workshop.crafts.megalith.label")
            ),
            this._getCraftOption(
              "eludium",
              this._options.items.eludium,
              this._host.i18n("$workshop.crafts.eludium.label")
            ),
            this._getCraftOption(
              "thorium",
              this._options.items.thorium,
              this._host.i18n("$workshop.crafts.thorium.label")
            ),
          ]),
          r.append(...this._optionButtons),
          (this._resourcesButton = $("<div/>", {
            id: "toggle-resource-controls",
            text: this._host.i18n("ui.craft.resources"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }));
        const l = this._getResourceOptions();
        this._itemsButton.on("click", () => {
          l.toggle(!1);
        }),
          this._resourcesButton.on("click", () => {
            r.toggle(!1), l.toggle();
          }),
          s.append(this._itemsButton),
          s.append(this._resourcesButton),
          s.append(this._triggerButton),
          s.append(r),
          s.append(l),
          (this.element = s);
      }
      _getCraftOption(t, e, i, s = !1) {
        const o = this.getOption(t, e, i, s, {
            onCheck: () => {
              (e.enabled = !0), this._host.imessage("status.auto.enable", [i]);
            },
            onUnCheck: () => {
              (e.enabled = !1), this._host.imessage("status.auto.disable", [i]);
            },
          }),
          a = $("<label/>", { for: "toggle-limited-" + t, text: this._host.i18n("ui.limit") }),
          n = $("<input/>", { id: "toggle-limited-" + t, type: "checkbox" }).data("option", e);
        return (
          (e.$limited = n),
          n.on("change", () => {
            n.is(":checked") && !1 === e.limited
              ? ((e.limited = !0), this._host.imessage("craft.limited", [i]))
              : n.is(":checked") ||
                !0 !== e.limited ||
                ((e.limited = !1), this._host.imessage("craft.unlimited", [i]));
          }),
          o.append(n, a),
          o
        );
      }
      _getResourceOptions() {
        if (this._resourcesList) return this._resourcesList;
        this._resourcesList = $("<ul/>", {
          id: "toggle-list-resources",
          css: { display: "none", paddingLeft: "20px" },
        });
        const t = $("<div/>", {
            id: "resources-add",
            text: this._host.i18n("resources.add"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              textShadow: "3px 3px 4px gray",
              borderBottom: "1px solid rgba(185, 185, 185, 0.7)",
            },
          }),
          e = $("<div/>", {
            id: "resources-clear-unused",
            text: this._host.i18n("resources.clear.unused"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          });
        e.on("click", () => {
          for (const t in this._host.options.auto.craft.resources) {
            const e = a.mustExist(this._host.options.auto.craft.resources[t]);
            ((!e.stock && e.consume === this._host.options.consume) || void 0 === e.consume) &&
              $("#resource-" + t).remove();
          }
        });
        const i = $("<ul/>", {
          id: "available-resources-list",
          css: { display: "none", paddingLeft: "20px" },
        });
        t.on("click", () => {
          i.toggle(),
            i.empty(),
            i.append(
              this.getAllAvailableResourceOptions(!1, t => {
                if (!this._options.resources[t.name]) {
                  const e = { consume: this._host.options.consume, enabled: !0, stock: 0 };
                  (this._options.resources[t.name] = e),
                    a.mustExist(this._resourcesList).append(
                      this.addNewResourceOption(t.name, t.title, e, (t, e) => {
                        delete this._options.resources[t];
                      })
                    );
                }
              })
            );
        }),
          this._resourcesList.append(t, e, i);
        for (const [t, e] of s.objectEntries(this._host.options.auto.craft.resources))
          this._resourcesList.append(
            this.addNewResourceOption(t, t, e, (t, e) => {
              delete this._options.resources[t];
            })
          );
        return this._resourcesList;
      }
      setState(t) {
        (this._options.enabled = t.enabled), (this._options.trigger = t.trigger);
        for (const [e, i] of s.objectEntries(this._options.items))
          (i.enabled = t.items[e].enabled), (i.limited = t.items[e].limited);
        for (const [t, e] of s.objectEntries(this._options.resources)) this.removeResourceOption(t);
        const e = this._getResourceOptions();
        for (const [i, o] of s.objectEntries(t.resources))
          e.append(
            this.addNewResourceOption(i, i, o, (t, e) => {
              delete this._options.resources[t];
            })
          );
        this._options.resources = t.resources;
      }
      refreshUi() {
        var t;
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled),
          (a.mustExist(this._options.$trigger)[0].title = this._options.trigger.toFixed(2));
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", e.enabled),
            a.mustExist(e.$limited).prop("checked", e.limited);
        for (const [e, i] of s.objectEntries(this._options.resources))
          a
            .mustExist(i.$consume)
            .text(
              this._host.i18n("resources.consume", [
                (null !== (t = i.consume) && void 0 !== t ? t : this._host.options.consume).toFixed(
                  2
                ),
              ])
            ),
            a
              .mustExist(i.$stock)
              .text(
                this._host.i18n("resources.stock", [
                  i.stock === 1 / 0 ? "∞" : this._host.gamePage.getDisplayValueExt(i.stock),
                ])
              );
      }
    }
    e.CraftSettingsUi = r;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.DistributeSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.distribute) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.distribute")),
          s = $("<li/>", { id: "ks-distribute" }),
          a = $("<label/>", { for: "toggle-distribute", text: i }),
          n = $("<input/>", { id: "toggle-distribute", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a);
        const r = this.getOptionHead("distribute");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-distribute",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this._getDistributeOption(
              "woodcutter",
              this._options.items.woodcutter,
              this._host.i18n("$village.job.woodcutter")
            ),
            this._getDistributeOption(
              "farmer",
              this._options.items.farmer,
              this._host.i18n("$village.job.farmer")
            ),
            this._getDistributeOption(
              "scholar",
              this._options.items.scholar,
              this._host.i18n("$village.job.scholar")
            ),
            this._getDistributeOption(
              "hunter",
              this._options.items.hunter,
              this._host.i18n("$village.job.hunter")
            ),
            this._getDistributeOption(
              "miner",
              this._options.items.miner,
              this._host.i18n("$village.job.miner")
            ),
            this._getDistributeOption(
              "priest",
              this._options.items.priest,
              this._host.i18n("$village.job.priest")
            ),
            this._getDistributeOption(
              "geologist",
              this._options.items.geologist,
              this._host.i18n("$village.job.geologist")
            ),
            this._getDistributeOption(
              "engineer",
              this._options.items.engineer,
              this._host.i18n("$village.job.engineer")
            ),
          ]),
          r.append(...this._optionButtons),
          s.append(this._itemsButton),
          s.append(r),
          (this.element = s);
      }
      _getDistributeOption(t, e, i) {
        const s = this.getOption(t, e, i);
        s.css("borderBottom", "1px solid rgba(185, 185, 185, 0.7)");
        const o = $("<label/>", { for: "toggle-limited-" + t, text: this._host.i18n("ui.limit") }),
          a = $("<input/>", { id: "toggle-limited-" + t, type: "checkbox" }).data("option", e);
        (e.$limited = a),
          a.on("change", () => {
            a.is(":checked") && 0 == e.limited
              ? ((e.limited = !0), this._host.imessage("distribute.limited", [i]))
              : a.is(":checked") ||
                1 != e.limited ||
                ((e.limited = !1), this._host.imessage("distribute.unlimited", [i]));
          }),
          s.append(a, o);
        const n = $("<div/>", {
          id: "set-" + t + "-max",
          text: this._host.i18n("ui.max", [e.max]),
          css: {
            cursor: "pointer",
            display: "inline-block",
            float: "right",
            paddingRight: "5px",
            textShadow: "3px 3px 4px gray",
          },
        }).data("option", e);
        return (
          (e.$max = n),
          n.on("click", () => {
            const t = window.prompt(this._host.i18n("ui.max.set", [i]), e.max.toString());
            null !== t &&
              ((e.max = parseInt(t)),
              (n[0].title = e.max.toString()),
              (n[0].innerText = this._host.i18n("ui.max", [e.max])));
          }),
          s.append(n),
          s
        );
      }
      setState(t) {
        a.mustExist(this._options.$enabled).prop("checked", t.enabled),
          (this._options.enabled = t.enabled);
        for (const [e, i] of s.objectEntries(this._options.items))
          (i.enabled = t.items[e].enabled),
            (i.limited = t.items[e].limited),
            (i.max = t.items[e].max);
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled);
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", this._options.items[t].enabled),
            a.mustExist(e.$limited).prop("checked", this._options.items[t].limited),
            a.mustExist(e.$max).text(this._host.i18n("ui.max", [this._options.items[t].max]));
      }
    }
    e.DistributeSettingsUi = r;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.EngineSettingsUi = void 0);
    const s = i(2),
      o = i(0),
      a = i(3);
    class n extends a.SettingsSectionUi {
      constructor(t, e = t.options.auto.engine) {
        super(t), (this._options = e);
        const i = s.ucfirst(this._host.i18n("ui.engine")),
          o = $("<li/>", { id: "ks-engine" }),
          a = $("<label/>", { for: "toggle-engine", text: i }),
          n = $("<input/>", { id: "toggle-engine", type: "checkbox" });
        (this._options.$enabled = n),
          o.append(n, a),
          n.on("change", () => {
            n.is(":checked") && 0 == e.enabled
              ? ((e.enabled = !0), this._host.engine.start(!0))
              : n.is(":checked") ||
                1 != e.enabled ||
                ((e.enabled = !1), this._host.engine.stop(!0));
          }),
          (this.element = o);
      }
      setState(t) {
        this._options.enabled = t.enabled;
      }
      refreshUi() {
        o.mustExist(this._options.$enabled).prop("checked", this._options.enabled);
      }
    }
    e.EngineSettingsUi = n;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.FiltersSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.filters) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.filter")),
          s = $("<li/>", { id: "ks-filter" }),
          a = $("<label/>", { for: "toggle-filter", text: i }),
          n = $("<input/>", { id: "toggle-filter", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a);
        const r = this.getOptionHead("filter");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-filter",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          });
        const l = [
            {
              name: "buildFilter",
              option: this._options.items.buildFilter,
              label: this._host.i18n("filter.build"),
            },
            {
              name: "craftFilter",
              option: this._options.items.craftFilter,
              label: this._host.i18n("filter.craft"),
            },
            {
              name: "upgradeFilter",
              option: this._options.items.upgradeFilter,
              label: this._host.i18n("filter.upgrade"),
            },
            {
              name: "researchFilter",
              option: this._options.items.researchFilter,
              label: this._host.i18n("filter.research"),
            },
            {
              name: "tradeFilter",
              option: this._options.items.tradeFilter,
              label: this._host.i18n("filter.trade"),
            },
            {
              name: "huntFilter",
              option: this._options.items.huntFilter,
              label: this._host.i18n("filter.hunt"),
            },
            {
              name: "praiseFilter",
              option: this._options.items.praiseFilter,
              label: this._host.i18n("filter.praise"),
            },
            {
              name: "adoreFilter",
              option: this._options.items.adoreFilter,
              label: this._host.i18n("filter.adore"),
            },
            {
              name: "transcendFilter",
              option: this._options.items.transcendFilter,
              label: this._host.i18n("filter.transcend"),
            },
            {
              name: "faithFilter",
              option: this._options.items.faithFilter,
              label: this._host.i18n("filter.faith"),
            },
            {
              name: "accelerateFilter",
              option: this._options.items.accelerateFilter,
              label: this._host.i18n("filter.accelerate"),
            },
            {
              name: "timeSkipFilter",
              option: this._options.items.timeSkipFilter,
              label: this._host.i18n("filter.time.skip"),
            },
            {
              name: "festivalFilter",
              option: this._options.items.festivalFilter,
              label: this._host.i18n("filter.festival"),
            },
            {
              name: "starFilter",
              option: this._options.items.starFilter,
              label: this._host.i18n("filter.star"),
            },
            {
              name: "distributeFilter",
              option: this._options.items.distributeFilter,
              label: this._host.i18n("filter.distribute"),
            },
            {
              name: "promoteFilter",
              option: this._options.items.promoteFilter,
              label: this._host.i18n("filter.promote"),
            },
            {
              name: "miscFilter",
              option: this._options.items.miscFilter,
              label: this._host.i18n("filter.misc"),
            },
          ],
          h = (t, e, i) =>
            this.getOption(t, e, i, !1, {
              onCheck: () => {
                (e.enabled = !0), this._host.imessage("filter.enable", [i]);
              },
              onUnCheck: () => {
                (e.enabled = !1), this._host.imessage("filter.disable", [i]);
              },
            });
        (this._optionButtons = l.map(t => h(t.name, t.option, t.label))),
          r.append(...this._optionButtons),
          s.append(this._itemsButton),
          s.append(r),
          (this.element = s);
      }
      setState(t) {
        this._options.enabled = t.enabled;
        for (const [e, i] of s.objectEntries(this._options.items)) i.enabled = t.items[e].enabled;
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled);
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", this._options.items[t].enabled);
      }
    }
    e.FiltersSettingsUi = r;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.OptionsSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.options) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.options")),
          s = $("<li/>", { id: "ks-options" }),
          a = $("<label/>", { for: "toggle-options", text: i }),
          n = $("<input/>", { id: "toggle-options", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a);
        const r = this.getOptionHead("options");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-options",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this._getOptionsOption(
              "observe",
              this._options.items.observe,
              this._host.i18n("option.observe")
            ),
            this._getOptionsOption(
              "festival",
              this._options.items.festival,
              this._host.i18n("option.festival")
            ),
            this._getOptionsOption(
              "shipOverride",
              this._options.items.shipOverride,
              this._host.i18n("option.shipOverride")
            ),
            this._getOptionsOption(
              "autofeed",
              this._options.items.autofeed,
              this._host.i18n("option.autofeed")
            ),
            this._getOptionsOption(
              "hunt",
              this._options.items.hunt,
              this._host.i18n("option.hunt")
            ),
            this._getOptionsOption(
              "promote",
              this._options.items.promote,
              this._host.i18n("option.promote")
            ),
            this._getOptionsOption(
              "crypto",
              this._options.items.crypto,
              this._host.i18n("option.crypto")
            ),
            this._getOptionsOption(
              "fixCry",
              this._options.items.fixCry,
              this._host.i18n("option.fix.cry")
            ),
            this._getOptionsOption(
              "buildEmbassies",
              this._options.items.buildEmbassies,
              this._host.i18n("option.embassies")
            ),
            this._getOptionsOption(
              "style",
              this._options.items.style,
              this._host.i18n("option.style")
            ),
            this._getOptionsOption(
              "_steamworks",
              this._options.items._steamworks,
              this._host.i18n("option.steamworks")
            ),
          ]),
          r.append(...this._optionButtons),
          s.append(this._itemsButton),
          s.append(r),
          (this.element = s);
      }
      _getOptionsOption(t, e, i) {
        const s = this.getOption(t, e, i);
        if ("style" === t) {
          const t = s.children("input");
          t.unbind("change"),
            t.on("change", () => {
              (e.enabled = t.prop("checked")),
                e.enabled
                  ? document.body.setAttribute("data-ks-style", "")
                  : document.body.removeAttribute("data-ks-style");
            });
        }
        if (void 0 !== e.subTrigger) {
          const o = $("<div/>", {
            id: "set-" + t + "-subTrigger",
            text: this._host.i18n("ui.trigger"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }).data("option", e);
          (e.$subTrigger = o),
            o.on("click", () => {
              let s;
              (s =
                "crypto" === t
                  ? window.prompt(
                      this._host.i18n("ui.trigger.crypto.set", [i]),
                      a.mustExist(e.subTrigger).toFixed(2)
                    )
                  : window.prompt(
                      this._host.i18n("ui.trigger.set", [i]),
                      a.mustExist(e.subTrigger).toFixed(2)
                    )),
                null !== s &&
                  ((e.subTrigger = parseFloat(s)), (o[0].title = e.subTrigger.toFixed(2)));
            }),
            s.append(o);
        }
        return s;
      }
      setState(t) {
        this._options.enabled = t.enabled;
        for (const [e, i] of s.objectEntries(this._options.items))
          (i.enabled = t.items[e].enabled),
            a.isNil(i.$subTrigger) || (i.subTrigger = t.items[e].subTrigger);
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled);
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", this._options.items[t].enabled),
            a.isNil(e.$subTrigger) ||
              (e.$subTrigger[0].title = a.mustExist(this._options.items[t].subTrigger).toFixed(2));
      }
    }
    e.OptionsSettingsUi = r;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.ReligionSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(6),
      r = i(3);
    class l extends r.SettingsSectionUi {
      constructor(t, e = t.options.auto.religion) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.faith")),
          s = $("<li/>", { id: "ks-faith" }),
          a = $("<label/>", { for: "toggle-faith", text: i }),
          n = $("<input/>", { id: "toggle-faith", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a),
          (this._triggerButton = $("<div/>", {
            id: "trigger-faith",
            text: this._host.i18n("ui.trigger"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          (this._options.$trigger = this._triggerButton),
          this._triggerButton.on("click", () => {
            const t = window.prompt(
              this._host.i18n("ui.trigger.set", [i]),
              this._options.trigger.toFixed(2)
            );
            null !== t &&
              ((this._options.trigger = parseFloat(t)),
              (this._triggerButton[0].title = this._options.trigger.toFixed(2)));
          });
        const r = this.getOptionHead("faith");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-faith",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this.getOption(
              "unicornPasture",
              this._options.items.unicornPasture,
              this._host.i18n("$buildings.unicornPasture.label")
            ),
            this.getOption(
              "unicornTomb",
              this._options.items.unicornTomb,
              this._host.i18n("$religion.zu.unicornTomb.label")
            ),
            this.getOption(
              "ivoryTower",
              this._options.items.ivoryTower,
              this._host.i18n("$religion.zu.ivoryTower.label")
            ),
            this.getOption(
              "ivoryCitadel",
              this._options.items.ivoryCitadel,
              this._host.i18n("$religion.zu.ivoryCitadel.label")
            ),
            this.getOption(
              "skyPalace",
              this._options.items.skyPalace,
              this._host.i18n("$religion.zu.skyPalace.label")
            ),
            this.getOption(
              "unicornUtopia",
              this._options.items.unicornUtopia,
              this._host.i18n("$religion.zu.unicornUtopia.label")
            ),
            this.getOption(
              "sunspire",
              this._options.items.sunspire,
              this._host.i18n("$religion.zu.sunspire.label"),
              !0
            ),
            this.getOption(
              "marker",
              this._options.items.marker,
              this._host.i18n("$religion.zu.marker.label")
            ),
            this.getOption(
              "unicornGraveyard",
              this._options.items.unicornGraveyard,
              this._host.i18n("$religion.zu.unicornGraveyard.label")
            ),
            this.getOption(
              "unicornNecropolis",
              this._options.items.unicornNecropolis,
              this._host.i18n("$religion.zu.unicornNecropolis.label")
            ),
            this.getOption(
              "blackPyramid",
              this._options.items.blackPyramid,
              this._host.i18n("$religion.zu.blackPyramid.label"),
              !0
            ),
            this.getOption(
              "solarchant",
              this._options.items.solarchant,
              this._host.i18n("$religion.ru.solarchant.label")
            ),
            this.getOption(
              "scholasticism",
              this._options.items.scholasticism,
              this._host.i18n("$religion.ru.scholasticism.label")
            ),
            this.getOption(
              "goldenSpire",
              this._options.items.goldenSpire,
              this._host.i18n("$religion.ru.goldenSpire.label")
            ),
            this.getOption(
              "sunAltar",
              this._options.items.sunAltar,
              this._host.i18n("$religion.ru.sunAltar.label")
            ),
            this.getOption(
              "stainedGlass",
              this._options.items.stainedGlass,
              this._host.i18n("$religion.ru.stainedGlass.label")
            ),
            this.getOption(
              "solarRevolution",
              this._options.items.solarRevolution,
              this._host.i18n("$religion.ru.solarRevolution.label")
            ),
            this.getOption(
              "basilica",
              this._options.items.basilica,
              this._host.i18n("$religion.ru.basilica.label")
            ),
            this.getOption(
              "templars",
              this._options.items.templars,
              this._host.i18n("$religion.ru.templars.label")
            ),
            this.getOption(
              "apocripha",
              this._options.items.apocripha,
              this._host.i18n("$religion.ru.apocripha.label")
            ),
            this.getOption(
              "transcendence",
              this._options.items.transcendence,
              this._host.i18n("$religion.ru.transcendence.label"),
              !0
            ),
            this.getOption(
              "blackObelisk",
              this._options.items.blackObelisk,
              this._host.i18n("$religion.tu.blackObelisk.label")
            ),
            this.getOption(
              "blackNexus",
              this._options.items.blackNexus,
              this._host.i18n("$religion.tu.blackNexus.label")
            ),
            this.getOption(
              "blackCore",
              this._options.items.blackCore,
              this._host.i18n("$religion.tu.blackCore.label")
            ),
            this.getOption(
              "singularity",
              this._options.items.singularity,
              this._host.i18n("$religion.tu.singularity.label")
            ),
            this.getOption(
              "blackLibrary",
              this._options.items.blackLibrary,
              this._host.i18n("$religion.tu.blackLibrary.label")
            ),
            this.getOption(
              "blackRadiance",
              this._options.items.blackRadiance,
              this._host.i18n("$religion.tu.blackRadiance.label")
            ),
            this.getOption(
              "blazar",
              this._options.items.blazar,
              this._host.i18n("$religion.tu.blazar.label")
            ),
            this.getOption(
              "darkNova",
              this._options.items.darkNova,
              this._host.i18n("$religion.tu.darkNova.label")
            ),
            this.getOption(
              "holyGenocide",
              this._options.items.holyGenocide,
              this._host.i18n("$religion.tu.holyGenocide.label")
            ),
          ]),
          r.append(...this._optionButtons);
        const l = this.getAdditionOptions(),
          h = $("<div/>", {
            id: "toggle-addition-controls",
            text: this._host.i18n("ui.faith.addtion"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          });
        h.on("click", () => {
          r.toggle(!1), l.toggle();
        }),
          s.append(this._itemsButton),
          s.append(h),
          s.append(this._triggerButton),
          s.append(r),
          s.append(l),
          (this.element = s);
      }
      getAdditionOptions() {
        const t = this.getOptionHead("faith-addition"),
          e = this._options.addition,
          i = this.getOption("adore", e.adore, this._host.i18n("option.faith.adore"), !1, {
            onCheck: () => {
              (e.adore.enabled = !0),
                this._host.imessage("status.sub.enable", [this._host.i18n("option.faith.adore")]);
            },
            onUnCheck: () => {
              (e.adore.enabled = !1),
                this._host.imessage("status.sub.disable", [this._host.i18n("option.faith.adore")]);
            },
          }),
          o = $("<div/>", {
            id: "set-adore-subTrigger",
            text: this._host.i18n("ui.trigger"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }).data("option", e.adore);
        (e.adore.$subTrigger = o),
          o.on("click", () => {
            const t = window.prompt(
              this._host.i18n("adore.trigger.set"),
              e.adore.subTrigger.toFixed(2)
            );
            null !== t &&
              ((e.adore.subTrigger = parseFloat(t)), (o[0].title = e.adore.subTrigger.toFixed(2)));
          }),
          i.append(o);
        const a = this.getOption("autoPraise", e.autoPraise, this._host.i18n("option.praise"), !1, {
            onCheck: () => {
              (e.autoPraise.enabled = !0),
                this._host.imessage("status.sub.enable", [this._host.i18n("option.praise")]);
            },
            onUnCheck: () => {
              (e.autoPraise.enabled = !1),
                this._host.imessage("status.sub.disable", [this._host.i18n("option.praise")]);
            },
          }),
          r = $("<div/>", {
            id: "set-autoPraise-subTrigger",
            text: this._host.i18n("ui.trigger"),
            title: e.autoPraise.subTrigger,
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }).data("option", e.autoPraise);
        (e.autoPraise.$subTrigger = r),
          r.on("click", () => {
            const t = window.prompt(
              this._host.i18n("ui.trigger.set", [this._host.i18n("option.praise")]),
              e.autoPraise.subTrigger.toFixed(2)
            );
            null !== t &&
              ((e.autoPraise.subTrigger = parseFloat(t)),
              (r[0].title = e.autoPraise.subTrigger.toFixed(2)));
          }),
          a.append(r);
        const l = this.getOption(
          "bestUnicornBuilding",
          e.bestUnicornBuilding,
          this._host.i18n("option.faith.best.unicorn"),
          !1,
          {
            onCheck: () => {
              (e.bestUnicornBuilding.enabled = !0),
                this._host.imessage("status.sub.enable", [
                  this._host.i18n("option.faith.best.unicorn"),
                ]);
            },
            onUnCheck: () => {
              (e.bestUnicornBuilding.enabled = !1),
                this._host.imessage("status.sub.disable", [
                  this._host.i18n("option.faith.best.unicorn"),
                ]);
            },
          }
        );
        l.children("label").prop("title", this._host.i18n("option.faith.best.unicorn.desc"));
        const h = l.children("input");
        h.unbind("change");
        const c = e.bestUnicornBuilding;
        h.on("change", () => {
          if (h.is(":checked") && !c.enabled) {
            c.enabled = !0;
            for (const [t, e] of s.objectEntries(this._options.items)) {
              if (
                e.variant !== n.UnicornItemVariant.Unknown_zp &&
                e.variant !== n.UnicornItemVariant.Ziggurat
              )
                continue;
              const i = $("#toggle-" + t);
              i.prop("checked", !0), i.trigger("change");
            }
            this._host.imessage("status.sub.enable", [
              this._host.i18n("option.faith.best.unicorn"),
            ]);
          } else
            !h.is(":checked") &&
              c.enabled &&
              ((c.enabled = !1),
              this._host.imessage("status.sub.disable", [
                this._host.i18n("option.faith.best.unicorn"),
              ]));
        });
        const g = this.getOption(
          "transcend",
          e.transcend,
          this._host.i18n("option.faith.transcend"),
          !1,
          {
            onCheck: () => {
              (e.transcend.enabled = !0),
                this._host.imessage("status.sub.enable", [
                  this._host.i18n("option.faith.transcend"),
                ]);
            },
            onUnCheck: () => {
              (e.transcend.enabled = !1),
                this._host.imessage("status.sub.disable", [
                  this._host.i18n("option.faith.transcend"),
                ]);
            },
          }
        );
        return t.append(l), t.append(a), t.append(i), t.append(g), t;
      }
      setState(t) {
        (this._options.enabled = t.enabled),
          (this._options.trigger = t.trigger),
          (this._options.addition.adore.enabled = t.addition.adore.enabled),
          (this._options.addition.adore.subTrigger = t.addition.adore.subTrigger),
          (this._options.addition.autoPraise.enabled = t.addition.autoPraise.enabled),
          (this._options.addition.autoPraise.subTrigger = t.addition.autoPraise.subTrigger),
          (this._options.addition.bestUnicornBuilding.enabled =
            t.addition.bestUnicornBuilding.enabled),
          (this._options.addition.transcend.enabled = t.addition.transcend.enabled);
        for (const [e, i] of s.objectEntries(this._options.items)) i.enabled = t.items[e].enabled;
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled),
          (a.mustExist(this._options.$trigger)[0].title = this._options.trigger.toFixed(2)),
          a
            .mustExist(this._options.addition.adore.$enabled)
            .prop("checked", this._options.addition.adore.enabled),
          (a.mustExist(this._options.addition.adore.$subTrigger)[0].title =
            this._options.addition.adore.subTrigger.toFixed(2)),
          a
            .mustExist(this._options.addition.autoPraise.$enabled)
            .prop("checked", this._options.addition.autoPraise.enabled),
          (a.mustExist(this._options.addition.autoPraise.$subTrigger)[0].title =
            this._options.addition.autoPraise.subTrigger.toFixed(2)),
          a
            .mustExist(this._options.addition.bestUnicornBuilding.$enabled)
            .prop("checked", this._options.addition.bestUnicornBuilding.enabled),
          a
            .mustExist(this._options.addition.transcend.$enabled)
            .prop("checked", this._options.addition.transcend.enabled);
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", this._options.items[t].enabled);
      }
    }
    e.ReligionSettingsUi = l;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.SpaceSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.space) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.space")),
          s = $("<li/>", { id: "ks-space" }),
          a = $("<label/>", { for: "toggle-space", text: i }),
          n = $("<input/>", { id: "toggle-space", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a),
          (this._triggerButton = $("<div/>", {
            id: "trigger-space",
            text: this._host.i18n("ui.trigger"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          (this._options.$trigger = this._triggerButton),
          this._triggerButton.on("click", () => {
            const t = window.prompt(
              this._host.i18n("ui.trigger.set", [i]),
              this._options.trigger.toString()
            );
            null !== t &&
              ((this._options.trigger = parseFloat(t)),
              (this._triggerButton[0].title = this._options.trigger.toString()));
          });
        const r = this.getOptionHead("space");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-space",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this._getLimitedOption(
              "spaceElevator",
              this._options.items.spaceElevator,
              this._host.i18n("$space.planet.cath.spaceElevator.label")
            ),
            this._getLimitedOption(
              "sattelite",
              this._options.items.sattelite,
              this._host.i18n("$space.planet.cath.sattelite.label")
            ),
            this._getLimitedOption(
              "spaceStation",
              this._options.items.spaceStation,
              this._host.i18n("$space.planet.cath.spaceStation.label"),
              !0
            ),
            this._getLimitedOption(
              "moonOutpost",
              this._options.items.moonOutpost,
              this._host.i18n("$space.planet.moon.moonOutpost.label")
            ),
            this._getLimitedOption(
              "moonBase",
              this._options.items.moonBase,
              this._host.i18n("$space.planet.moon.moonBase.label"),
              !0
            ),
            this._getLimitedOption(
              "planetCracker",
              this._options.items.planetCracker,
              this._host.i18n("$space.planet.dune.planetCracker.label")
            ),
            this._getLimitedOption(
              "hydrofracturer",
              this._options.items.hydrofracturer,
              this._host.i18n("$space.planet.dune.hydrofracturer.label")
            ),
            this._getLimitedOption(
              "spiceRefinery",
              this._options.items.spiceRefinery,
              this._host.i18n("$space.planet.dune.spiceRefinery.label"),
              !0
            ),
            this._getLimitedOption(
              "researchVessel",
              this._options.items.researchVessel,
              this._host.i18n("$space.planet.piscine.researchVessel.label")
            ),
            this._getLimitedOption(
              "orbitalArray",
              this._options.items.orbitalArray,
              this._host.i18n("$space.planet.piscine.orbitalArray.label"),
              !0
            ),
            this._getLimitedOption(
              "sunlifter",
              this._options.items.sunlifter,
              this._host.i18n("$space.planet.helios.sunlifter.label")
            ),
            this._getLimitedOption(
              "containmentChamber",
              this._options.items.containmentChamber,
              this._host.i18n("$space.planet.helios.containmentChamber.label")
            ),
            this._getLimitedOption(
              "heatsink",
              this._options.items.heatsink,
              this._host.i18n("$space.planet.helios.heatsink.label")
            ),
            this._getLimitedOption(
              "sunforge",
              this._options.items.sunforge,
              this._host.i18n("$space.planet.helios.sunforge.label"),
              !0
            ),
            this._getLimitedOption(
              "cryostation",
              this._options.items.cryostation,
              this._host.i18n("$space.planet.terminus.cryostation.label"),
              !0
            ),
            this._getLimitedOption(
              "spaceBeacon",
              this._options.items.spaceBeacon,
              this._host.i18n("$space.planet.kairo.spaceBeacon.label"),
              !0
            ),
            this._getLimitedOption(
              "terraformingStation",
              this._options.items.terraformingStation,
              this._host.i18n("$space.planet.yarn.terraformingStation.label")
            ),
            this._getLimitedOption(
              "hydroponics",
              this._options.items.hydroponics,
              this._host.i18n("$space.planet.yarn.hydroponics.label"),
              !0
            ),
            this._getLimitedOption(
              "hrHarvester",
              this._options.items.hrHarvester,
              this._host.i18n("$space.planet.umbra.hrHarvester.label"),
              !0
            ),
            this._getLimitedOption(
              "entangler",
              this._options.items.entangler,
              this._host.i18n("$space.planet.charon.entangler.label"),
              !0
            ),
            this._getLimitedOption(
              "tectonic",
              this._options.items.tectonic,
              this._host.i18n("$space.planet.centaurusSystem.tectonic.label")
            ),
            this._getLimitedOption(
              "moltenCore",
              this._options.items.moltenCore,
              this._host.i18n("$space.planet.centaurusSystem.moltenCore.label")
            ),
          ]),
          r.append(...this._optionButtons),
          s.append(this._itemsButton),
          s.append(this._triggerButton),
          s.append(r),
          (this.element = s);
      }
      _getLimitedOption(t, e, i, s = !1) {
        const o = this.getOption(t, e, i, s, {
            onCheck: () => {
              (e.enabled = !0), this._host.imessage("status.auto.enable", [i]);
            },
            onUnCheck: () => {
              (e.enabled = !1), this._host.imessage("status.auto.disable", [i]);
            },
          }),
          a = $("<div/>", {
            id: "set-" + t + "-max",
            text: this._host.i18n("ui.max", [e.max]),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }).data("option", e);
        return (
          (e.$max = a),
          a.on("click", () => {
            const t = window.prompt(this._host.i18n("ui.max.set", [i]), e.max.toString());
            null !== t &&
              ((e.max = parseInt(t)),
              (a[0].title = e.max.toString()),
              (a[0].innerText = this._host.i18n("ui.max", [e.max])));
          }),
          o.append(a),
          o
        );
      }
      setState(t) {
        (this._options.enabled = t.enabled), (this._options.trigger = t.trigger);
        for (const [e, i] of s.objectEntries(this._options.items))
          (i.enabled = t.items[e].enabled), (i.max = t.items[e].max);
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled),
          (a.mustExist(this._options.$trigger)[0].title = this._options.trigger.toFixed(2));
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", this._options.items[t].enabled),
            a.mustExist(e.$max).text(this._host.i18n("ui.max", [this._options.items[t].max]));
      }
    }
    e.SpaceSettingsUi = r;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.TimeControlSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.timeCtrl) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.timeCtrl")),
          s = $("<li/>", { id: "ks-timeCtrl" }),
          a = $("<label/>", { for: "toggle-timeCtrl", text: i }),
          n = $("<input/>", { id: "toggle-timeCtrl", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a);
        const r = this.getOptionHead("timeCtrl");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-timeCtrl",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this._getOptionAccelerateTime(
              "accelerateTime",
              this._options.items.accelerateTime,
              this._host.i18n("option.accelerate")
            ),
            this._getOptionTimeSkip(
              "timeSkip",
              this._options.items.timeSkip,
              this._host.i18n("option.time.skip")
            ),
            this._getOptionReset(
              "reset",
              this._options.items.reset,
              this._host.i18n("option.time.reset")
            ),
          ]),
          r.append(...this._optionButtons),
          s.append(this._itemsButton),
          s.append(r),
          (this.element = s);
      }
      _getOptionTimeSkip(t, e, i) {
        const s = this.getOption(t, e, i),
          o = $("<div/>", {
            id: "set-timeSkip-subTrigger",
            text: this._host.i18n("ui.trigger"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }).data("option", e);
        (e.$subTrigger = o),
          o.on("click", () => {
            const t = window.prompt(
              this._host.i18n("time.skip.trigger.set", []),
              e.subTrigger.toFixed(2)
            );
            null !== t && ((e.subTrigger = parseFloat(t)), (o[0].title = e.subTrigger.toFixed(2)));
          });
        const a = $("<div/>", {
          id: "set-timeSkip-maximum",
          text: this._host.i18n("ui.maximum"),
          css: {
            cursor: "pointer",
            display: "inline-block",
            float: "right",
            paddingRight: "5px",
            textShadow: "3px 3px 4px gray",
          },
        }).data("option", e);
        (e.$maximum = a),
          a.on("click", () => {
            const t = window.prompt(
              this._host.i18n("ui.max.set", [this._host.i18n("option.time.skip")]),
              e.maximum.toFixed(0)
            );
            null !== t && ((e.maximum = parseFloat(t)), (a[0].title = e.maximum.toFixed(0)));
          });
        const n = $("<div/>", {
            id: "toggle-cycle-" + t,
            text: this._host.i18n("ui.cycles"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }),
          r = $("<ul/>", { id: "cycles-list-" + t, css: { display: "none", paddingLeft: "20px" } });
        for (let t = 0; t < this._host.gamePage.calendar.cycles.length; ++t)
          r.append(this._getCycle(t, e));
        const l = $("<div/>", {
            id: "toggle-seasons-" + t,
            text: this._host.i18n("trade.seasons"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }),
          h = $("<ul/>", {
            id: "seasons-list-" + t,
            css: { display: "none", paddingLeft: "20px" },
          });
        return (
          h.append(this._getSeasonForTimeSkip("spring", e)),
          h.append(this._getSeasonForTimeSkip("summer", e)),
          h.append(this._getSeasonForTimeSkip("autumn", e)),
          h.append(this._getSeasonForTimeSkip("winter", e)),
          n.on("click", function () {
            r.toggle(), h.toggle(!1);
          }),
          l.on("click", function () {
            r.toggle(!1), h.toggle();
          }),
          s.append(n, l, a, o, r, h),
          s
        );
      }
      _getOptionReset(t, e, i) {
        const o = this.getOption(t, e, i),
          a = this.getOptionHead("reset-build");
        a.append(
          this._getResetOption(
            "hut",
            "build",
            this._options.buildItems.hut,
            this._host.i18n("$buildings.hut.label")
          ),
          this._getResetOption(
            "logHouse",
            "build",
            this._options.buildItems.logHouse,
            this._host.i18n("$buildings.logHouse.label")
          ),
          this._getResetOption(
            "mansion",
            "build",
            this._options.buildItems.mansion,
            this._host.i18n("$buildings.mansion.label"),
            !0
          ),
          this._getResetOption(
            "workshop",
            "build",
            this._options.buildItems.workshop,
            this._host.i18n("$buildings.workshop.label")
          ),
          this._getResetOption(
            "factory",
            "build",
            this._options.buildItems.factory,
            this._host.i18n("$buildings.factory.label"),
            !0
          ),
          this._getResetOption(
            "field",
            "build",
            this._options.buildItems.field,
            this._host.i18n("$buildings.field.label")
          ),
          this._getResetOption(
            "pasture",
            "build",
            this._options.buildItems.pasture,
            this._host.i18n("$buildings.pasture.label")
          ),
          this._getResetOption(
            "solarFarm",
            "build",
            this._options.buildItems.solarFarm,
            this._host.i18n("$buildings.solarfarm.label")
          ),
          this._getResetOption(
            "mine",
            "build",
            this._options.buildItems.mine,
            this._host.i18n("$buildings.mine.label")
          ),
          this._getResetOption(
            "lumberMill",
            "build",
            this._options.buildItems.lumberMill,
            this._host.i18n("$buildings.lumberMill.label")
          ),
          this._getResetOption(
            "aqueduct",
            "build",
            this._options.buildItems.aqueduct,
            this._host.i18n("$buildings.aqueduct.label")
          ),
          this._getResetOption(
            "hydroPlant",
            "build",
            this._options.buildItems.hydroPlant,
            this._host.i18n("$buildings.hydroplant.label")
          ),
          this._getResetOption(
            "oilWell",
            "build",
            this._options.buildItems.oilWell,
            this._host.i18n("$buildings.oilWell.label")
          ),
          this._getResetOption(
            "quarry",
            "build",
            this._options.buildItems.quarry,
            this._host.i18n("$buildings.quarry.label"),
            !0
          ),
          this._getResetOption(
            "smelter",
            "build",
            this._options.buildItems.smelter,
            this._host.i18n("$buildings.smelter.label")
          ),
          this._getResetOption(
            "biolab",
            "build",
            this._options.buildItems.biolab,
            this._host.i18n("$buildings.biolab.label")
          ),
          this._getResetOption(
            "calciner",
            "build",
            this._options.buildItems.calciner,
            this._host.i18n("$buildings.calciner.label")
          ),
          this._getResetOption(
            "reactor",
            "build",
            this._options.buildItems.reactor,
            this._host.i18n("$buildings.reactor.label")
          ),
          this._getResetOption(
            "accelerator",
            "build",
            this._options.buildItems.accelerator,
            this._host.i18n("$buildings.accelerator.label")
          ),
          this._getResetOption(
            "steamworks",
            "build",
            this._options.buildItems.steamworks,
            this._host.i18n("$buildings.steamworks.label")
          ),
          this._getResetOption(
            "magneto",
            "build",
            this._options.buildItems.magneto,
            this._host.i18n("$buildings.magneto.label"),
            !0
          ),
          this._getResetOption(
            "library",
            "build",
            this._options.buildItems.library,
            this._host.i18n("$buildings.library.label")
          ),
          this._getResetOption(
            "dataCenter",
            "build",
            this._options.buildItems.dataCenter,
            this._host.i18n("$buildings.dataCenter.label")
          ),
          this._getResetOption(
            "academy",
            "build",
            this._options.buildItems.academy,
            this._host.i18n("$buildings.academy.label")
          ),
          this._getResetOption(
            "observatory",
            "build",
            this._options.buildItems.observatory,
            this._host.i18n("$buildings.observatory.label"),
            !0
          ),
          this._getResetOption(
            "amphitheatre",
            "build",
            this._options.buildItems.amphitheatre,
            this._host.i18n("$buildings.amphitheatre.label")
          ),
          this._getResetOption(
            "broadcastTower",
            "build",
            this._options.buildItems.broadcastTower,
            this._host.i18n("$buildings.broadcasttower.label")
          ),
          this._getResetOption(
            "tradepost",
            "build",
            this._options.buildItems.tradepost,
            this._host.i18n("$buildings.tradepost.label")
          ),
          this._getResetOption(
            "chapel",
            "build",
            this._options.buildItems.chapel,
            this._host.i18n("$buildings.chapel.label")
          ),
          this._getResetOption(
            "temple",
            "build",
            this._options.buildItems.temple,
            this._host.i18n("$buildings.temple.label")
          ),
          this._getResetOption(
            "mint",
            "build",
            this._options.buildItems.mint,
            this._host.i18n("$buildings.mint.label")
          ),
          this._getResetOption(
            "ziggurat",
            "build",
            this._options.buildItems.ziggurat,
            this._host.i18n("$buildings.ziggurat.label")
          ),
          this._getResetOption(
            "chronosphere",
            "build",
            this._options.buildItems.chronosphere,
            this._host.i18n("$buildings.chronosphere.label")
          ),
          this._getResetOption(
            "aiCore",
            "build",
            this._options.buildItems.aiCore,
            this._host.i18n("$buildings.aicore.label")
          ),
          this._getResetOption(
            "brewery",
            "build",
            this._options.buildItems.brewery,
            this._host.i18n("$buildings.brewery.label"),
            !0
          ),
          this._getResetOption(
            "barn",
            "build",
            this._options.buildItems.barn,
            this._host.i18n("$buildings.barn.label")
          ),
          this._getResetOption(
            "harbor",
            "build",
            this._options.buildItems.harbor,
            this._host.i18n("$buildings.harbor.label")
          ),
          this._getResetOption(
            "warehouse",
            "build",
            this._options.buildItems.warehouse,
            this._host.i18n("$buildings.warehouse.label"),
            !0
          ),
          this._getResetOption(
            "zebraOutpost",
            "build",
            this._options.buildItems.zebraOutpost,
            this._host.i18n("$buildings.zebraOutpost.label")
          ),
          this._getResetOption(
            "zebraWorkshop",
            "build",
            this._options.buildItems.zebraWorkshop,
            this._host.i18n("$buildings.zebraWorkshop.label")
          ),
          this._getResetOption(
            "zebraForge",
            "build",
            this._options.buildItems.zebraForge,
            this._host.i18n("$buildings.zebraForge.label")
          )
        );
        const n = this.getOptionHead("reset-space");
        n.append(
          this._getResetOption(
            "spaceElevator",
            "space",
            this._options.spaceItems.spaceElevator,
            this._host.i18n("$space.planet.cath.spaceElevator.label")
          ),
          this._getResetOption(
            "sattelite",
            "space",
            this._options.spaceItems.sattelite,
            this._host.i18n("$space.planet.cath.sattelite.label")
          ),
          this._getResetOption(
            "spaceStation",
            "space",
            this._options.spaceItems.spaceStation,
            this._host.i18n("$space.planet.cath.spaceStation.label"),
            !0
          ),
          this._getResetOption(
            "moonOutpost",
            "space",
            this._options.spaceItems.moonOutpost,
            this._host.i18n("$space.planet.moon.moonOutpost.label")
          ),
          this._getResetOption(
            "moonBase",
            "space",
            this._options.spaceItems.moonBase,
            this._host.i18n("$space.planet.moon.moonBase.label"),
            !0
          ),
          this._getResetOption(
            "planetCracker",
            "space",
            this._options.spaceItems.planetCracker,
            this._host.i18n("$space.planet.dune.planetCracker.label")
          ),
          this._getResetOption(
            "hydrofracturer",
            "space",
            this._options.spaceItems.hydrofracturer,
            this._host.i18n("$space.planet.dune.hydrofracturer.label")
          ),
          this._getResetOption(
            "spiceRefinery",
            "space",
            this._options.spaceItems.spiceRefinery,
            this._host.i18n("$space.planet.dune.spiceRefinery.label"),
            !0
          ),
          this._getResetOption(
            "researchVessel",
            "space",
            this._options.spaceItems.researchVessel,
            this._host.i18n("$space.planet.piscine.researchVessel.label")
          ),
          this._getResetOption(
            "orbitalArray",
            "space",
            this._options.spaceItems.orbitalArray,
            this._host.i18n("$space.planet.piscine.orbitalArray.label"),
            !0
          ),
          this._getResetOption(
            "sunlifter",
            "space",
            this._options.spaceItems.sunlifter,
            this._host.i18n("$space.planet.helios.sunlifter.label")
          ),
          this._getResetOption(
            "containmentChamber",
            "space",
            this._options.spaceItems.containmentChamber,
            this._host.i18n("$space.planet.helios.containmentChamber.label")
          ),
          this._getResetOption(
            "heatsink",
            "space",
            this._options.spaceItems.heatsink,
            this._host.i18n("$space.planet.helios.heatsink.label")
          ),
          this._getResetOption(
            "sunforge",
            "space",
            this._options.spaceItems.sunforge,
            this._host.i18n("$space.planet.helios.sunforge.label"),
            !0
          ),
          this._getResetOption(
            "cryostation",
            "space",
            this._options.spaceItems.cryostation,
            this._host.i18n("$space.planet.terminus.cryostation.label"),
            !0
          ),
          this._getResetOption(
            "spaceBeacon",
            "space",
            this._options.spaceItems.spaceBeacon,
            this._host.i18n("$space.planet.kairo.spaceBeacon.label"),
            !0
          ),
          this._getResetOption(
            "terraformingStation",
            "space",
            this._options.spaceItems.terraformingStation,
            this._host.i18n("$space.planet.yarn.terraformingStation.label")
          ),
          this._getResetOption(
            "hydroponics",
            "space",
            this._options.spaceItems.hydroponics,
            this._host.i18n("$space.planet.yarn.hydroponics.label"),
            !0
          ),
          this._getResetOption(
            "hrHarvester",
            "space",
            this._options.spaceItems.hrHarvester,
            this._host.i18n("$space.planet.umbra.hrHarvester.label"),
            !0
          ),
          this._getResetOption(
            "entangler",
            "space",
            this._options.spaceItems.entangler,
            this._host.i18n("$space.planet.charon.entangler.label"),
            !0
          ),
          this._getResetOption(
            "tectonic",
            "space",
            this._options.spaceItems.tectonic,
            this._host.i18n("$space.planet.centaurusSystem.tectonic.label")
          ),
          this._getResetOption(
            "moltenCore",
            "space",
            this._options.spaceItems.moltenCore,
            this._host.i18n("$space.planet.centaurusSystem.moltenCore.label")
          )
        );
        const r = this._getResourceOptions();
        for (const [t, e] of s.objectEntries(this._options.resources))
          r.append(
            this.addNewResourceOptionForReset(t, t, e, (t, e) => {
              delete this._options.resources[t];
            })
          ),
            this.setStockValue(t, e.stockForReset, !0);
        const l = this.getOptionHead("reset-religion");
        l.append(
          this._getResetOption(
            "unicornPasture",
            "faith",
            this._options.religionItems.unicornPasture,
            this._host.i18n("$buildings.unicornPasture.label")
          ),
          this._getResetOption(
            "unicornTomb",
            "faith",
            this._options.religionItems.unicornTomb,
            this._host.i18n("$religion.zu.unicornTomb.label")
          ),
          this._getResetOption(
            "ivoryTower",
            "faith",
            this._options.religionItems.ivoryTower,
            this._host.i18n("$religion.zu.ivoryTower.label")
          ),
          this._getResetOption(
            "ivoryCitadel",
            "faith",
            this._options.religionItems.ivoryCitadel,
            this._host.i18n("$religion.zu.ivoryCitadel.label")
          ),
          this._getResetOption(
            "skyPalace",
            "faith",
            this._options.religionItems.skyPalace,
            this._host.i18n("$religion.zu.skyPalace.label")
          ),
          this._getResetOption(
            "unicornUtopia",
            "faith",
            this._options.religionItems.unicornUtopia,
            this._host.i18n("$religion.zu.unicornUtopia.label")
          ),
          this._getResetOption(
            "sunspire",
            "faith",
            this._options.religionItems.sunspire,
            this._host.i18n("$religion.zu.sunspire.label"),
            !0
          ),
          this._getResetOption(
            "marker",
            "faith",
            this._options.religionItems.marker,
            this._host.i18n("$religion.zu.marker.label")
          ),
          this._getResetOption(
            "unicornGraveyard",
            "faith",
            this._options.religionItems.unicornGraveyard,
            this._host.i18n("$religion.zu.unicornGraveyard.label")
          ),
          this._getResetOption(
            "unicornNecropolis",
            "faith",
            this._options.religionItems.unicornNecropolis,
            this._host.i18n("$religion.zu.unicornNecropolis.label")
          ),
          this._getResetOption(
            "blackPyramid",
            "faith",
            this._options.religionItems.blackPyramid,
            this._host.i18n("$religion.zu.blackPyramid.label"),
            !0
          ),
          this._getResetOption(
            "solarchant",
            "faith",
            this._options.religionItems.solarchant,
            this._host.i18n("$religion.ru.solarchant.label")
          ),
          this._getResetOption(
            "scholasticism",
            "faith",
            this._options.religionItems.scholasticism,
            this._host.i18n("$religion.ru.scholasticism.label")
          ),
          this._getResetOption(
            "goldenSpire",
            "faith",
            this._options.religionItems.goldenSpire,
            this._host.i18n("$religion.ru.goldenSpire.label")
          ),
          this._getResetOption(
            "sunAltar",
            "faith",
            this._options.religionItems.sunAltar,
            this._host.i18n("$religion.ru.sunAltar.label")
          ),
          this._getResetOption(
            "stainedGlass",
            "faith",
            this._options.religionItems.stainedGlass,
            this._host.i18n("$religion.ru.stainedGlass.label")
          ),
          this._getResetOption(
            "solarRevolution",
            "faith",
            this._options.religionItems.solarRevolution,
            this._host.i18n("$religion.ru.solarRevolution.label")
          ),
          this._getResetOption(
            "basilica",
            "faith",
            this._options.religionItems.basilica,
            this._host.i18n("$religion.ru.basilica.label")
          ),
          this._getResetOption(
            "templars",
            "faith",
            this._options.religionItems.templars,
            this._host.i18n("$religion.ru.templars.label")
          ),
          this._getResetOption(
            "apocripha",
            "faith",
            this._options.religionItems.apocripha,
            this._host.i18n("$religion.ru.apocripha.label")
          ),
          this._getResetOption(
            "transcendence",
            "faith",
            this._options.religionItems.transcendence,
            this._host.i18n("$religion.ru.transcendence.label"),
            !0
          ),
          this._getResetOption(
            "blackObelisk",
            "faith",
            this._options.religionItems.blackObelisk,
            this._host.i18n("$religion.tu.blackObelisk.label")
          ),
          this._getResetOption(
            "blackNexus",
            "faith",
            this._options.religionItems.blackNexus,
            this._host.i18n("$religion.tu.blackNexus.label")
          ),
          this._getResetOption(
            "blackCore",
            "faith",
            this._options.religionItems.blackCore,
            this._host.i18n("$religion.tu.blackCore.label")
          ),
          this._getResetOption(
            "singularity",
            "faith",
            this._options.religionItems.singularity,
            this._host.i18n("$religion.tu.singularity.label")
          ),
          this._getResetOption(
            "blackLibrary",
            "faith",
            this._options.religionItems.blackLibrary,
            this._host.i18n("$religion.tu.blackLibrary.label")
          ),
          this._getResetOption(
            "blackRadiance",
            "faith",
            this._options.religionItems.blackRadiance,
            this._host.i18n("$religion.tu.blackRadiance.label")
          ),
          this._getResetOption(
            "blazar",
            "faith",
            this._options.religionItems.blazar,
            this._host.i18n("$religion.tu.blazar.label")
          ),
          this._getResetOption(
            "darkNova",
            "faith",
            this._options.religionItems.darkNova,
            this._host.i18n("$religion.tu.darkNova.label")
          ),
          this._getResetOption(
            "holyGenocide",
            "faith",
            this._options.religionItems.holyGenocide,
            this._host.i18n("$religion.tu.holyGenocide.label")
          )
        );
        const h = this.getOptionHead("reset-time");
        h.append(
          this._getResetOption(
            "temporalBattery",
            "time",
            this._options.timeItems.temporalBattery,
            this._host.i18n("$time.cfu.temporalBattery.label")
          ),
          this._getResetOption(
            "blastFurnace",
            "time",
            this._options.timeItems.blastFurnace,
            this._host.i18n("$time.cfu.blastFurnace.label")
          ),
          this._getResetOption(
            "timeBoiler",
            "time",
            this._options.timeItems.timeBoiler,
            this._host.i18n("$time.cfu.timeBoiler.label")
          ),
          this._getResetOption(
            "temporalAccelerator",
            "time",
            this._options.timeItems.temporalAccelerator,
            this._host.i18n("$time.cfu.temporalAccelerator.label")
          ),
          this._getResetOption(
            "temporalImpedance",
            "time",
            this._options.timeItems.temporalImpedance,
            this._host.i18n("$time.cfu.temporalImpedance.label")
          ),
          this._getResetOption(
            "ressourceRetrieval",
            "time",
            this._options.timeItems.ressourceRetrieval,
            this._host.i18n("$time.cfu.ressourceRetrieval.label"),
            !0
          ),
          this._getResetOption(
            "cryochambers",
            "time",
            this._options.timeItems.cryochambers,
            this._host.i18n("$time.vsu.cryochambers.label")
          ),
          this._getResetOption(
            "voidHoover",
            "time",
            this._options.timeItems.voidHoover,
            this._host.i18n("$time.vsu.voidHoover.label")
          ),
          this._getResetOption(
            "voidRift",
            "time",
            this._options.timeItems.voidRift,
            this._host.i18n("$time.vsu.voidRift.label")
          ),
          this._getResetOption(
            "chronocontrol",
            "time",
            this._options.timeItems.chronocontrol,
            this._host.i18n("$time.vsu.chronocontrol.label")
          ),
          this._getResetOption(
            "voidResonator",
            "time",
            this._options.timeItems.voidResonator,
            this._host.i18n("$time.vsu.voidResonator.label")
          )
        );
        const c = $("<div/>", {
            id: "toggle-reset-build",
            text: this._host.i18n("ui.build"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }),
          g = $("<div/>", {
            id: "toggle-reset-space",
            text: this._host.i18n("ui.space"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }),
          u = $("<div/>", {
            id: "toggle-reset-resources",
            text: this._host.i18n("ui.craft.resources"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }),
          d = $("<div/>", {
            id: "toggle-reset-religion",
            text: this._host.i18n("ui.faith"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }),
          m = $("<div/>", {
            id: "toggle-reset-time",
            text: this._host.i18n("ui.time"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          });
        return (
          c.on("click", () => {
            a.toggle(), n.toggle(!1), r.toggle(!1), l.toggle(!1), h.toggle(!1);
          }),
          g.on("click", () => {
            a.toggle(!1), n.toggle(), r.toggle(!1), l.toggle(!1), h.toggle(!1);
          }),
          u.on("click", () => {
            a.toggle(!1), n.toggle(!1), r.toggle(), l.toggle(!1), h.toggle(!1);
          }),
          d.on("click", () => {
            a.toggle(!1), n.toggle(!1), r.toggle(!1), l.toggle(), h.toggle(!1);
          }),
          m.on("click", () => {
            a.toggle(!1), n.toggle(!1), r.toggle(!1), l.toggle(!1), h.toggle();
          }),
          o.append(c, g, u, d, m, a, n, r, l, h),
          o
        );
      }
      _getOptionAccelerateTime(t, e, i) {
        const s = this.getOption(t, e, i),
          o = $("<div/>", {
            id: "set-" + t + "-subTrigger",
            text: this._host.i18n("ui.trigger"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }).data("option", e);
        return (
          (e.$subTrigger = o),
          o.on("click", () => {
            const t = window.prompt(
              this._host.i18n("ui.trigger.set", [i]),
              e.subTrigger.toFixed(2)
            );
            null !== t && ((e.subTrigger = parseFloat(t)), (o[0].title = e.subTrigger.toFixed(2)));
          }),
          s.append(o),
          s
        );
      }
      _getCycle(t, e) {
        const i = this._host.gamePage.calendar.cycles[t],
          s = $("<li/>"),
          o = $("<label/>", { for: "toggle-timeSkip-" + t, text: i.title }),
          a = $("<input/>", { id: "toggle-timeSkip-" + t, type: "checkbox" }).data("option", e);
        return (
          (e["$" + t] = a),
          a.on("change", () => {
            a.is(":checked") && !1 === e[t]
              ? ((e[t] = !0), this._host.imessage("time.skip.cycle.enable", [i.title]))
              : a.is(":checked") ||
                !0 !== e[t] ||
                ((e[t] = !1), this._host.imessage("time.skip.cycle.disable", [i.title]));
          }),
          s.append(a, o),
          s
        );
      }
      _getResetOption(t, e, i, s, o = !1) {
        const a = $("<li/>"),
          n = s,
          r = $("<label/>", {
            for: "toggle-reset-" + e + "-" + t,
            text: n,
            css: { display: "inline-block", marginBottom: o ? "10px" : void 0, minWidth: "80px" },
          }),
          l = $("<input/>", { id: "toggle-reset-" + e + "-" + t, type: "checkbox" }).data(
            "option",
            i
          );
        (i.$checkForReset = l),
          l.on("change", () => {
            l.is(":checked") && !1 === i.checkForReset
              ? ((i.checkForReset = !0), this._host.imessage("status.reset.check.enable", [n]))
              : l.is(":checked") ||
                !0 !== i.checkForReset ||
                ((i.checkForReset = !1), this._host.imessage("status.reset.check.disable", [n]));
          });
        const h = $("<div/>", {
          id: "set-reset-" + e + "-" + t + "-min",
          text: this._host.i18n("ui.min", [i.triggerForReset]),
          css: {
            cursor: "pointer",
            display: "inline-block",
            float: "right",
            paddingRight: "5px",
            textShadow: "3px 3px 4px gray",
          },
        }).data("option", i);
        return (
          (i.$triggerForReset = h),
          h.on("click", () => {
            const t = window.prompt(
              this._host.i18n("reset.check.trigger.set", [s]),
              i.triggerForReset.toFixed(2)
            );
            null !== t &&
              ((i.triggerForReset = parseInt(t)),
              h.text(this._host.i18n("ui.min", [i.triggerForReset])));
          }),
          a.append(l, r, h),
          a
        );
      }
      _getSeasonForTimeSkip(t, e) {
        const i = o.ucfirst(this._host.i18n("$calendar.season." + t)),
          s = $("<li/>"),
          a = $("<label/>", { for: "toggle-timeSkip-" + t, text: o.ucfirst(i) }),
          n = $("<input/>", { id: "toggle-timeSkip-" + t, type: "checkbox" }).data("option", e);
        return (
          (e["$" + t] = n),
          n.on("change", () => {
            n.is(":checked") && !1 === e[t]
              ? ((e[t] = !0), this._host.imessage("time.skip.season.enable", [i]))
              : n.is(":checked") ||
                !0 !== e[t] ||
                ((e[t] = !1), this._host.imessage("time.skip.season.disable", [i]));
          }),
          s.append(n, a),
          s
        );
      }
      _getResourceOptions() {
        this._resourcesList = $("<ul/>", {
          id: "toggle-reset-list-resources",
          css: { display: "none", paddingLeft: "20px" },
        });
        const t = $("<div/>", {
          id: "resources-add",
          text: this._host.i18n("resources.add"),
          css: {
            cursor: "pointer",
            display: "inline-block",
            textShadow: "3px 3px 4px gray",
            borderBottom: "1px solid rgba(185, 185, 185, 0.7)",
          },
        });
        $("<div/>", {
          id: "resources-clear-unused",
          text: this._host.i18n("resources.clear.unused"),
          css: {
            cursor: "pointer",
            display: "inline-block",
            float: "right",
            paddingRight: "5px",
            textShadow: "3px 3px 4px gray",
          },
        }).on("click", () => {
          for (const t in this._host.options.auto.craft.resources) {
            const e = a.mustExist(this._host.options.auto.craft.resources[t]);
            ((!e.stock && e.consume === this._host.options.consume) || void 0 === e.consume) &&
              $("#resource-" + t).remove();
          }
        });
        const e = $("<ul/>", {
          id: "available-resources-list",
          css: { display: "none", paddingLeft: "20px" },
        });
        return (
          t.on("click", () => {
            e.toggle(),
              e.empty(),
              e.append(
                this.getAllAvailableResourceOptions(!0, t => {
                  if (!this._options.resources[t.name]) {
                    const e = { checkForReset: !0, stockForReset: 1 / 0 };
                    (this._options.resources[t.name] = e),
                      $("#toggle-reset-list-resources").append(
                        this.addNewResourceOptionForReset(t.name, t.title, e, (t, e) => {
                          delete this._options.resources[t];
                        })
                      );
                  }
                })
              );
          }),
          this._resourcesList.append(t, e),
          this._resourcesList
        );
      }
      setState(t) {
        (this._options.enabled = t.enabled),
          (this._options.items.accelerateTime.enabled = t.items.accelerateTime.enabled),
          (this._options.items.accelerateTime.subTrigger = t.items.accelerateTime.subTrigger),
          (this._options.items.reset.enabled = t.items.reset.enabled),
          (this._options.items.timeSkip.enabled = t.items.timeSkip.enabled),
          (this._options.items.timeSkip.subTrigger = t.items.timeSkip.subTrigger),
          (this._options.items.timeSkip.autumn = t.items.timeSkip.autumn),
          (this._options.items.timeSkip.spring = t.items.timeSkip.spring),
          (this._options.items.timeSkip.summer = t.items.timeSkip.summer),
          (this._options.items.timeSkip.winter = t.items.timeSkip.winter),
          (this._options.items.timeSkip[0] = t.items.timeSkip[0]),
          (this._options.items.timeSkip[1] = t.items.timeSkip[1]),
          (this._options.items.timeSkip[2] = t.items.timeSkip[2]),
          (this._options.items.timeSkip[3] = t.items.timeSkip[3]),
          (this._options.items.timeSkip[4] = t.items.timeSkip[4]),
          (this._options.items.timeSkip[5] = t.items.timeSkip[5]),
          (this._options.items.timeSkip[6] = t.items.timeSkip[6]),
          (this._options.items.timeSkip[7] = t.items.timeSkip[7]),
          (this._options.items.timeSkip[8] = t.items.timeSkip[8]),
          (this._options.items.timeSkip[9] = t.items.timeSkip[9]);
        for (const [e, i] of s.objectEntries(this._options.buildItems))
          (i.checkForReset = t.buildItems[e].checkForReset),
            (i.triggerForReset = t.buildItems[e].triggerForReset);
        for (const [e, i] of s.objectEntries(this._options.religionItems))
          (i.checkForReset = t.religionItems[e].checkForReset),
            (i.triggerForReset = t.religionItems[e].triggerForReset);
        for (const [e, i] of s.objectEntries(this._options.spaceItems))
          (i.checkForReset = t.spaceItems[e].checkForReset),
            (i.triggerForReset = t.spaceItems[e].triggerForReset);
        for (const [e, i] of s.objectEntries(this._options.timeItems))
          (i.checkForReset = t.timeItems[e].checkForReset),
            (i.triggerForReset = t.timeItems[e].triggerForReset);
        if (
          Object.keys(this._options.resources).length !== Object.keys(t.resources).length ||
          s.objectEntries(this._options.resources).some(([e, i]) => {
            var s, o;
            return (
              i.checkForReset !==
                (null === (s = t.resources[e]) || void 0 === s ? void 0 : s.checkForReset) ||
              i.stockForReset !==
                (null === (o = t.resources[e]) || void 0 === o ? void 0 : o.stockForReset)
            );
          })
        ) {
          for (const [t, e] of s.objectEntries(this._options.resources))
            a.isNil(e.$checkForReset) || (e.$checkForReset.remove(), (e.$checkForReset = void 0)),
              a.isNil(e.$stockForReset) || (e.$stockForReset.remove(), (e.$stockForReset = void 0));
          this._options.resources = Object.assign({}, t.resources);
          for (const [t, e] of s.objectEntries(this._options.resources))
            a.mustExist(this._resourcesList).append(
              this.addNewResourceOptionForReset(t, t, e, (t, e) => {
                delete this._options.resources[t];
              })
            );
        } else
          for (const [e, i] of s.objectEntries(this._options.resources)) {
            const s = a.mustExist(t.resources[e]);
            (i.checkForReset = s.checkForReset), (i.stockForReset = s.stockForReset);
          }
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled),
          a
            .mustExist(this._options.items.accelerateTime.$enabled)
            .prop("checked", this._options.items.accelerateTime.enabled),
          (a.mustExist(this._options.items.accelerateTime.$subTrigger)[0].title =
            this._options.items.accelerateTime.subTrigger.toFixed(2)),
          a
            .mustExist(this._options.items.reset.$enabled)
            .prop("checked", this._options.items.reset.enabled),
          a
            .mustExist(this._options.items.timeSkip.$enabled)
            .prop("checked", this._options.items.timeSkip.enabled),
          (a.mustExist(this._options.items.timeSkip.$subTrigger)[0].title =
            this._options.items.timeSkip.subTrigger.toFixed(2)),
          a
            .mustExist(this._options.items.timeSkip.$autumn)
            .prop("checked", this._options.items.timeSkip.autumn),
          a
            .mustExist(this._options.items.timeSkip.$spring)
            .prop("checked", this._options.items.timeSkip.spring),
          a
            .mustExist(this._options.items.timeSkip.$summer)
            .prop("checked", this._options.items.timeSkip.summer),
          a
            .mustExist(this._options.items.timeSkip.$winter)
            .prop("checked", this._options.items.timeSkip.winter),
          a
            .mustExist(this._options.items.timeSkip.$0)
            .prop("checked", this._options.items.timeSkip[0]),
          a
            .mustExist(this._options.items.timeSkip.$1)
            .prop("checked", this._options.items.timeSkip[1]),
          a
            .mustExist(this._options.items.timeSkip.$2)
            .prop("checked", this._options.items.timeSkip[2]),
          a
            .mustExist(this._options.items.timeSkip.$3)
            .prop("checked", this._options.items.timeSkip[3]),
          a
            .mustExist(this._options.items.timeSkip.$4)
            .prop("checked", this._options.items.timeSkip[4]),
          a
            .mustExist(this._options.items.timeSkip.$5)
            .prop("checked", this._options.items.timeSkip[5]),
          a
            .mustExist(this._options.items.timeSkip.$6)
            .prop("checked", this._options.items.timeSkip[6]),
          a
            .mustExist(this._options.items.timeSkip.$7)
            .prop("checked", this._options.items.timeSkip[7]),
          a
            .mustExist(this._options.items.timeSkip.$8)
            .prop("checked", this._options.items.timeSkip[8]),
          a
            .mustExist(this._options.items.timeSkip.$9)
            .prop("checked", this._options.items.timeSkip[9]);
        for (const [t, e] of s.objectEntries(this._options.buildItems))
          a.mustExist(e.$checkForReset).prop("checked", this._options.buildItems[t].checkForReset),
            a
              .mustExist(e.$triggerForReset)
              .text(this._host.i18n("ui.min", [this._options.buildItems[t].triggerForReset]));
        for (const [t, e] of s.objectEntries(this._options.religionItems))
          a
            .mustExist(e.$checkForReset)
            .prop("checked", this._options.religionItems[t].checkForReset),
            a
              .mustExist(e.$triggerForReset)
              .text(this._host.i18n("ui.min", [this._options.religionItems[t].triggerForReset]));
        for (const [t, e] of s.objectEntries(this._options.spaceItems))
          a.mustExist(e.$checkForReset).prop("checked", this._options.spaceItems[t].checkForReset),
            a
              .mustExist(e.$triggerForReset)
              .text(this._host.i18n("ui.min", [this._options.spaceItems[t].triggerForReset]));
        for (const [t, e] of s.objectEntries(this._options.timeItems))
          a.mustExist(e.$checkForReset).prop("checked", this._options.timeItems[t].checkForReset),
            a
              .mustExist(e.$triggerForReset)
              .text(this._host.i18n("ui.min", [this._options.timeItems[t].triggerForReset]));
        for (const [t, e] of s.objectEntries(this._options.resources))
          a.mustExist(e.$stockForReset).text(
            this._host.i18n("resources.stock", [
              e.stockForReset === 1 / 0
                ? "∞"
                : this._host.gamePage.getDisplayValueExt(
                    a.mustExist(this._options.resources[t]).stockForReset
                  ),
            ])
          );
      }
    }
    e.TimeControlSettingsUi = r;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.TimeSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.time) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.time")),
          s = $("<li/>", { id: "ks-time" }),
          a = $("<label/>", { for: "toggle-time", text: i }),
          n = $("<input/>", { id: "toggle-time", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a),
          (this._triggerButton = $("<div/>", {
            id: "trigger-time",
            text: this._host.i18n("ui.trigger"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          (this._options.$trigger = this._triggerButton),
          this._triggerButton.on("click", () => {
            const t = window.prompt(
              this._host.i18n("ui.trigger.set", [i]),
              this._options.trigger.toFixed(2)
            );
            null !== t &&
              ((this._options.trigger = parseFloat(t)),
              (this._triggerButton[0].title = this._options.trigger.toFixed(2)));
          });
        const r = this.getOptionHead("time");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-time",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this.getOption(
              "temporalBattery",
              this._options.items.temporalBattery,
              this._host.i18n("$time.cfu.temporalBattery.label")
            ),
            this.getOption(
              "blastFurnace",
              this._options.items.blastFurnace,
              this._host.i18n("$time.cfu.blastFurnace.label")
            ),
            this.getOption(
              "timeBoiler",
              this._options.items.timeBoiler,
              this._host.i18n("$time.cfu.timeBoiler.label")
            ),
            this.getOption(
              "temporalAccelerator",
              this._options.items.temporalAccelerator,
              this._host.i18n("$time.cfu.temporalAccelerator.label")
            ),
            this.getOption(
              "temporalImpedance",
              this._options.items.temporalImpedance,
              this._host.i18n("$time.cfu.temporalImpedance.label")
            ),
            this.getOption(
              "ressourceRetrieval",
              this._options.items.ressourceRetrieval,
              this._host.i18n("$time.cfu.ressourceRetrieval.label"),
              !0
            ),
            this.getOption(
              "cryochambers",
              this._options.items.cryochambers,
              this._host.i18n("$time.vsu.cryochambers.label")
            ),
            this.getOption(
              "voidHoover",
              this._options.items.voidHoover,
              this._host.i18n("$time.vsu.voidHoover.label")
            ),
            this.getOption(
              "voidRift",
              this._options.items.voidRift,
              this._host.i18n("$time.vsu.voidRift.label")
            ),
            this.getOption(
              "chronocontrol",
              this._options.items.chronocontrol,
              this._host.i18n("$time.vsu.chronocontrol.label")
            ),
            this.getOption(
              "voidResonator",
              this._options.items.voidResonator,
              this._host.i18n("$time.vsu.voidResonator.label")
            ),
          ]),
          r.append(...this._optionButtons),
          s.append(this._itemsButton),
          s.append(this._triggerButton),
          s.append(r),
          (this.element = s);
      }
      setState(t) {
        (this._options.enabled = t.enabled), (this._options.trigger = t.trigger);
        for (const [e, i] of s.objectEntries(this._options.items)) i.enabled = t.items[e].enabled;
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled),
          (a.mustExist(this._options.$trigger)[0].title = this._options.trigger.toFixed(2));
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", this._options.items[t].enabled);
      }
    }
    e.TimeSettingsUi = r;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.TradingSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.trade) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.trade")),
          s = $("<li/>", { id: "ks-trade" }),
          a = $("<label/>", { for: "toggle-trade", text: i }),
          n = $("<input/>", { id: "toggle-trade", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a),
          (this._triggerButton = $("<div/>", {
            id: "trigger-trade",
            text: this._host.i18n("ui.trigger"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          (this._options.$trigger = this._triggerButton),
          this._triggerButton.on("click", () => {
            const t = window.prompt(
              this._host.i18n("ui.trigger.set", [i]),
              this._options.trigger.toFixed(2)
            );
            null !== t &&
              ((this._options.trigger = parseFloat(t)),
              (this._triggerButton[0].title = this._options.trigger.toFixed(2)));
          });
        const r = this.getOptionHead("trade");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-trade",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this._getTradeOption(
              "dragons",
              this._options.items.dragons,
              this._host.i18n("$trade.race.dragons")
            ),
            this._getTradeOption(
              "zebras",
              this._options.items.zebras,
              this._host.i18n("$trade.race.zebras")
            ),
            this._getTradeOption(
              "lizards",
              this._options.items.lizards,
              this._host.i18n("$trade.race.lizards")
            ),
            this._getTradeOption(
              "sharks",
              this._options.items.sharks,
              this._host.i18n("$trade.race.sharks")
            ),
            this._getTradeOption(
              "griffins",
              this._options.items.griffins,
              this._host.i18n("$trade.race.griffins")
            ),
            this._getTradeOption(
              "nagas",
              this._options.items.nagas,
              this._host.i18n("$trade.race.nagas")
            ),
            this._getTradeOption(
              "spiders",
              this._options.items.spiders,
              this._host.i18n("$trade.race.spiders")
            ),
            this._getTradeOption(
              "leviathans",
              this._options.items.leviathans,
              this._host.i18n("$trade.race.leviathans")
            ),
          ]),
          r.append(...this._optionButtons),
          s.append(this._itemsButton),
          s.append(this._triggerButton),
          s.append(r),
          (this.element = s);
      }
      _getTradeOption(t, e, i) {
        const s = this.getOption(t, e, i);
        s.css("borderBottom", "1px solid rgba(185, 185, 185, 0.7)");
        const o = $("<label/>", { for: "toggle-limited-" + t, text: this._host.i18n("ui.limit") }),
          a = $("<input/>", { id: "toggle-limited-" + t, type: "checkbox" }).data("option", e);
        (e.$limited = a),
          a.on("change", () => {
            a.is(":checked") && !1 === e.limited
              ? ((e.limited = !0), this._host.imessage("trade.limited", [i]))
              : a.is(":checked") ||
                !0 !== e.limited ||
                ((e.limited = !1), this._host.imessage("trade.unlimited", [i]));
          }),
          s.append(a, o);
        const n = $("<div/>", {
            id: "toggle-seasons-" + t,
            text: this._host.i18n("trade.seasons"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          }),
          r = $("<ul/>", {
            id: "seasons-list-" + t,
            css: { display: "none", paddingLeft: "20px" },
          });
        return (
          r.append(this._getSeason(t, "spring", e)),
          r.append(this._getSeason(t, "summer", e)),
          r.append(this._getSeason(t, "autumn", e)),
          r.append(this._getSeason(t, "winter", e)),
          n.on("click", function () {
            r.toggle();
          }),
          s.append(n, r),
          s
        );
      }
      _getSeason(t, e, i) {
        const s = o.ucfirst(this._host.i18n("$trade.race." + t)),
          a = o.ucfirst(this._host.i18n("$calendar.season." + e)),
          n = $("<li/>"),
          r = $("<label/>", { for: "toggle-" + t + "-" + e, text: o.ucfirst(a) }),
          l = $("<input/>", { id: "toggle-" + t + "-" + e, type: "checkbox" }).data("option", i);
        return (
          (i["$" + e] = l),
          l.on("change", () => {
            l.is(":checked") && !1 === i[e]
              ? ((i[e] = !0), this._host.imessage("trade.season.enable", [s, a]))
              : l.is(":checked") ||
                !0 !== i[e] ||
                ((i[e] = !1), this._host.imessage("trade.season.disable", [s, a]));
          }),
          n.append(l, r),
          n
        );
      }
      setState(t) {
        (this._options.enabled = t.enabled), (this._options.trigger = t.trigger);
        for (const [e, i] of s.objectEntries(this._options.items))
          (i.enabled = t.items[e].enabled),
            (i.limited = t.items[e].limited),
            (i.autumn = t.items[e].autumn),
            (i.spring = t.items[e].spring),
            (i.summer = t.items[e].summer),
            (i.winter = t.items[e].winter);
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled),
          (a.mustExist(this._options.$trigger)[0].title = this._options.trigger.toFixed(2));
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", this._options.items[t].enabled),
            a.mustExist(e.$limited).prop("checked", this._options.items[t].limited),
            a.mustExist(e.$autumn).prop("checked", this._options.items[t].autumn),
            a.mustExist(e.$spring).prop("checked", this._options.items[t].spring),
            a.mustExist(e.$summer).prop("checked", this._options.items[t].summer),
            a.mustExist(e.$winter).prop("checked", this._options.items[t].winter);
      }
    }
    e.TradingSettingsUi = r;
  },
  function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.UnlockingSettingsUi = void 0);
    const s = i(1),
      o = i(2),
      a = i(0),
      n = i(3);
    class r extends n.SettingsSectionUi {
      constructor(t, e = t.options.auto.unlock) {
        super(t), (this._optionButtons = new Array()), (this._options = e);
        const i = o.ucfirst(this._host.i18n("ui.upgrade")),
          s = $("<li/>", { id: "ks-upgrade" }),
          a = $("<label/>", { for: "toggle-upgrade", text: i }),
          n = $("<input/>", { id: "toggle-upgrade", type: "checkbox" });
        (this._options.$enabled = n),
          n.on("change", () => {
            n.is(":checked") && !1 === this._options.enabled
              ? ((this._options.enabled = !0), this._host.imessage("status.auto.enable", [i]))
              : n.is(":checked") ||
                !0 !== this._options.enabled ||
                ((this._options.enabled = !1), this._host.imessage("status.auto.disable", [i]));
          }),
          s.append(n, a);
        const r = this.getOptionHead("upgrade");
        s.css("borderBottom", "1px  solid rgba(185, 185, 185, 0.7)"),
          (this._itemsButton = $("<div/>", {
            id: "toggle-items-upgrade",
            text: this._host.i18n("ui.items"),
            css: {
              cursor: "pointer",
              display: "inline-block",
              float: "right",
              paddingRight: "5px",
              textShadow: "3px 3px 4px gray",
            },
          })),
          this._itemsButton.on("click", () => {
            r.toggle();
          }),
          (this._optionButtons = [
            this.getOption(
              "upgrades",
              this._options.items.upgrades,
              this._host.i18n("ui.upgrade.upgrades"),
              !1,
              {
                onCheck: () => {
                  (this._options.items.upgrades.enabled = !0),
                    this._host.imessage("status.auto.enable", [
                      this._host.i18n("ui.upgrade.upgrades"),
                    ]);
                },
                onUnCheck: () => {
                  (this._options.items.upgrades.enabled = !1),
                    this._host.imessage("status.auto.disable", [
                      this._host.i18n("ui.upgrade.upgrades"),
                    ]);
                },
              }
            ),
            this.getOption(
              "techs",
              this._options.items.techs,
              this._host.i18n("ui.upgrade.techs"),
              !1,
              {
                onCheck: () => {
                  (this._options.items.techs.enabled = !0),
                    this._host.imessage("status.auto.enable", [
                      this._host.i18n("ui.upgrade.techs"),
                    ]);
                },
                onUnCheck: () => {
                  (this._options.items.techs.enabled = !1),
                    this._host.imessage("status.auto.disable", [
                      this._host.i18n("ui.upgrade.techs"),
                    ]);
                },
              }
            ),
            this.getOption(
              "races",
              this._options.items.races,
              this._host.i18n("ui.upgrade.races"),
              !1,
              {
                onCheck: () => {
                  (this._options.items.races.enabled = !0),
                    this._host.imessage("status.auto.enable", [
                      this._host.i18n("ui.upgrade.races"),
                    ]);
                },
                onUnCheck: () => {
                  (this._options.items.races.enabled = !1),
                    this._host.imessage("status.auto.disable", [
                      this._host.i18n("ui.upgrade.races"),
                    ]);
                },
              }
            ),
            this.getOption(
              "missions",
              this._options.items.missions,
              this._host.i18n("ui.upgrade.missions"),
              !1,
              {
                onCheck: () => {
                  (this._options.items.missions.enabled = !0),
                    this._host.imessage("status.auto.enable", [
                      this._host.i18n("ui.upgrade.missions"),
                    ]);
                },
                onUnCheck: () => {
                  (this._options.items.missions.enabled = !1),
                    this._host.imessage("status.auto.disable", [
                      this._host.i18n("ui.upgrade.missions"),
                    ]);
                },
              }
            ),
            this.getOption(
              "buildings",
              this._options.items.buildings,
              this._host.i18n("ui.upgrade.buildings"),
              !1,
              {
                onCheck: () => {
                  (this._options.items.buildings.enabled = !0),
                    this._host.imessage("status.auto.enable", [
                      this._host.i18n("ui.upgrade.buildings"),
                    ]);
                },
                onUnCheck: () => {
                  (this._options.items.buildings.enabled = !1),
                    this._host.imessage("status.auto.disable", [
                      this._host.i18n("ui.upgrade.buildings"),
                    ]);
                },
              }
            ),
          ]),
          r.append(...this._optionButtons),
          s.append(this._itemsButton),
          s.append(r),
          (this.element = s);
      }
      setState(t) {
        this._options.enabled = t.enabled;
        for (const [e, i] of s.objectEntries(this._options.items)) i.enabled = t.items[e].enabled;
      }
      refreshUi() {
        a.mustExist(this._options.$enabled).prop("checked", this._options.enabled);
        for (const [t, e] of s.objectEntries(this._options.items))
          a.mustExist(e.$enabled).prop("checked", this._options.items[t].enabled);
      }
    }
    e.UnlockingSettingsUi = r;
  },
]);
