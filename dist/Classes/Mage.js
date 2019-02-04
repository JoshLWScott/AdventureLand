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
import { MyParty } from "../Store/MyParty";
import { Skills } from "../Store/Skills";
import { COMBAT_ENABLED, FOCUS_TANK_TARGET } from "../Store/Constants";
var Mage = /** @class */ (function (_super) {
    __extends(Mage, _super);
    function Mage() {
        var _this = _super.call(this) || this;
        _this.ClassName = "Mage";
        _this.Target = null;
        _this.LastCast_Energize = new Date();
        _this.LastCast_ManaBurst = new Date();
        game_log("Injected ClassController: " + _this.ClassName);
        return _this;
    }
    Mage.prototype.castEnergize = function (target) {
        if (target !== null && this.timeFromLastCast(this.LastCast_Energize) > Skills.Mage.Energize.Cooldown) {
            game_log("Casting Energize on: " + target.name);
            this.LastCast_Energize = new Date();
            use_skill(Skills.Mage.Energize.SpellName, target);
        }
    };
    Mage.prototype.runClassLoop = function () {
        if (COMBAT_ENABLED) {
            FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity();
            this.moveToTarget();
            this.attackTarget();
            this.castEnergize(MyParty.getHealer().mp < MyParty.getHealer().max_mp / 2 ? MyParty.getHealer() : MyParty.getTank() || MyParty.getRanger());
        }
        else
            this.moveToTank();
    };
    return Mage;
}(ClassController));
new Mage();
