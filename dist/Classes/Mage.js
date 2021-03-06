var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ClassController } from "./ClassController";
import { MyParty } from "../Store/MyParty";
import { Skills } from "../Store/Skills";
import { COMBAT_ENABLED, FOCUS_TANK_TARGET } from "../Store/Constants";
var Mage = /** @class */ (function (_super) {
    __extends(Mage, _super);
    function Mage() {
        var _this = _super.call(this) || this;
        _this.ClassName = "Mage";
        _this.LastCast_Energize = new Date();
        _this.LastCast_ManaBurst = new Date();
        game_log("Injected ClassController: " + _this.ClassName);
        return _this;
    }
    Mage.prototype.castEnergize = function (target) {
        if (target !== null && this.timeFromLastCast(this.LastCast_Energize) > Skills.Mage.Energize.Cooldown) {
            if (this.timeFromLastCast(this.LastCast_Energize) >= 60 || target.mp <= 330) {
                game_log("Casting Energize on: " + target.name);
                this.LastCast_Energize = new Date();
                use_skill(Skills.Mage.Energize.SpellName, target);
            }
        }
    };
    Mage.prototype.runClassLoop = function () {
        if (COMBAT_ENABLED) {
            FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity();
            // this.moveToTarget()
            // this.attackTarget()
            if (MyParty.getRanger() !== null) {
                this.castEnergize(MyParty.getRanger());
                move(MyParty.getRanger().real_x, MyParty.getRanger().real_y);
            }
        }
    };
    return Mage;
}(ClassController));
new Mage();
