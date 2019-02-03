var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ClassController } from "./ClassController";
import { COMBAT_ENABLED, FOCUS_TANK_TARGET, MY_PARTY_NAMES } from "../Store/Constants";
import { Skills } from "../Store/Skills";
var Priest = /** @class */ (function (_super) {
    __extends(Priest, _super);
    function Priest() {
        var _this = _super.call(this) || this;
        _this.minHealPercentage = 0.80;
        _this.curseTargetMaxHealth = 1000;
        _this.ClassName = "Priest";
        _this.Target = null;
        _this.HealTarget = null;
        _this.HealWeight = null;
        _this.LastCast_Curse = new Date();
        game_log("Injected ClassController: " + _this.ClassName);
        return _this;
    }
    Priest.prototype.healPartyMember = function () {
        var _this = this;
        this.HealTarget = null;
        this.HealWeight = null;
        MY_PARTY_NAMES.map(function (playerName) {
            var player = get_player(playerName);
            if (player !== null && can_heal(player) &&
                player.hp < player.max_hp * _this.minHealPercentage &&
                _this.HealWeight === null || player.hp / player.max_hp * 100 < _this.HealWeight) {
                _this.HealWeight = player.hp / player.max_hp * 100;
                _this.HealTarget = player;
            }
        });
        if (this.HealTarget !== null && can_heal(this.HealTarget)) {
            game_log("Healing: " + this.HealTarget.name);
            heal(this.HealTarget);
            return true;
        }
        return false;
    };
    Priest.prototype.curseTarget = function () {
        if (this.Target !== null &&
            this.timeFromLastCast(this.LastCast_Curse) > Skills.Priest.Curse.Cooldown &&
            this.curseTargetMaxHealth <= this.Target.max_hp) {
            game_log("Cursing: " + this.Target.name);
            use_skill(Skills.Priest.Curse.SpellName, this.Target);
        }
    };
    Priest.prototype.runClassLoop = function () {
        if (this.healPartyMember())
            return;
        if (COMBAT_ENABLED) {
            FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity();
            this.moveToTarget();
            this.curseTarget();
            this.attackTarget();
        }
        else
            this.moveToTank();
    };
    return Priest;
}(ClassController));
new Priest();
