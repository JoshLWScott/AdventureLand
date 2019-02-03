import { FOLLOW_TANK } from "../Store/Constants";
import { MyParty } from "../Store/MyParty";
var ClassController = /** @class */ (function () {
    function ClassController() {
        var _this = this;
        this.TargetName = "bee";
        setInterval(function () {
            if (character.rip || is_moving(character))
                return;
            loot(true);
            _this.Target = get_targeted_monster();
            _this.usePotions();
            if (FOLLOW_TANK)
                _this.moveToTank();
            _this.runClassLoop();
        }, 1000 / 4);
    }
    /* Calculate the amount of seconds it's been since the last cast */
    ClassController.prototype.timeFromLastCast = function (lastCast) {
        return Math.abs((lastCast.getTime() - new Date().getTime()) / 1000);
    };
    ClassController.prototype.targetLocalEntity = function () {
        if (!this.Target) {
            this.Target = get_nearest_monster({ min_xp: 100, max_att: 150, type: this.TargetName });
            if (this.Target) {
                change_target(this.Target);
            }
            else
                set_message("No Monsters");
        }
    };
    ClassController.prototype.targetTankEntity = function () {
        if (!this.Target && MyParty.getTank() !== null) {
            this.Target = get_target_of(MyParty.getTank());
        }
    };
    ClassController.prototype.moveToTarget = function () {
        if (this.Target !== null && !in_attack_range(this.Target)) {
            set_message("Moving to target");
            move(character.x + (this.Target.real_x - character.x) / 2, character.y + (this.Target.real_y - character.y) / 2);
        }
    };
    ClassController.prototype.attackTarget = function () {
        if (this.Target !== null && can_attack(this.Target)) {
            set_message("Attacking: " + this.Target.name);
            attack(this.Target);
        }
    };
    ClassController.prototype.usePotions = function () {
        if (character.hp < character.max_hp - 200 && can_use("hp"))
            use("hp");
        if (character.mp < character.max_mp - 300 && can_use("mp"))
            use("mp");
    };
    ClassController.prototype.moveToTank = function () {
        if (MyParty.getTank() !== null) {
            move(MyParty.getTank().real_x, MyParty.getTank().real_y);
        }
    };
    return ClassController;
}());
export { ClassController };
