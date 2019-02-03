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
import { COMBAT_ENABLED, FOCUS_TANK_TARGET } from "../Store/Constants";
var Priest = /** @class */ (function (_super) {
    __extends(Priest, _super);
    function Priest() {
        var _this = _super.call(this) || this;
        _this.ClassName = "Priest";
        _this.Target = null;
        _this.LastCast_Energize = new Date();
        _this.LastCast_ManaBurst = new Date();
        game_log("Injected ClassController: " + _this.ClassName);
        return _this;
    }
    Priest.prototype.runClassLoop = function () {
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
