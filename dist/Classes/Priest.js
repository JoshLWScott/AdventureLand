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
var Priest = /** @class */ (function (_super) {
    __extends(Priest, _super);
    function Priest() {
        var _this = _super.call(this) || this;
        _this.minHealPercentage = 0.80;
        _this.ClassName = "Priest";
        _this.Target = null;
        _this.HealTarget = null;
        _this.HealWeight = null;
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
    Priest.prototype.runClassLoop = function () {
        if (this.healPartyMember())
            return;
        if (COMBAT_ENABLED) {
            if (FOCUS_TANK_TARGET)
                if (!this.targetTankEntity())
                    return;
                else if (!this.targetLocalEntity())
                    return;
            this.moveToTarget();
            this.attackTarget();
        }
        else
            this.moveToTank();
    };
    return Priest;
}(ClassController));
new Priest();
