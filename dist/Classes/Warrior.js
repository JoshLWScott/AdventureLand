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
import { COMBAT_ENABLED } from "../Store/Constants";
var Warrior = /** @class */ (function (_super) {
    __extends(Warrior, _super);
    function Warrior() {
        var _this = _super.call(this) || this;
        _this.ClassName = "Warrior";
        game_log("Injected ClassController: " + _this.ClassName);
        return _this;
    }
    Warrior.prototype.runClassLoop = function () {
        if (COMBAT_ENABLED) {
            this.targetLocalEntity();
            this.moveToTarget();
            this.attackTarget();
        }
    };
    return Warrior;
}(ClassController));
new Warrior();
