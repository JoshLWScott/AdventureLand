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
var Ranger = /** @class */ (function (_super) {
    __extends(Ranger, _super);
    function Ranger() {
        var _this = _super.call(this) || this;
        _this.ClassName = "Ranger";
        _this.Target = null;
        game_log("Injected ClassController: " + _this.ClassName);
        return _this;
    }
    Ranger.prototype.runClassLoop = function () {
        if (COMBAT_ENABLED) {
            FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity();
            this.moveToTarget();
            this.attackTarget();
        }
        else
            this.moveToTank();
    };
    return Ranger;
}(ClassController));
new Ranger();