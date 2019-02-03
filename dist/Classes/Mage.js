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
    Mage.prototype.castEnergize = function () {
        if (MyParty.getTank() !== null) {
            game_log("Last Energize " + this.timeFromLastCast(this.LastCast_Energize) + " seconds ago");
            if (this.timeFromLastCast(this.LastCast_Energize) > Skills.Mage.Energize.Cooldown) {
                this.LastCast_Energize = new Date();
                use_skill(Skills.Mage.Energize.SpellName, MyParty.getTank());
            }
        }
    };
    Mage.prototype.runClassLoop = function () {
        if (COMBAT_ENABLED) {
            /* Energize the tank */
            this.castEnergize();
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
    return Mage;
}(ClassController));
new Mage();
