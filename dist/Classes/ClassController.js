import { FOLLOW_TANK } from "../Store/Constants";
import { MyParty } from "../Store/MyParty";
export class ClassController {
    constructor() {
        setInterval(() => {
            if (character.rip || is_moving(character))
                return;
            this.Target = get_targeted_monster();
            this.usePotions();
            FOLLOW_TANK ? this.moveToTank() : null;
            this.runClassLoop();
        }, 1000 / 4);
    }
    /* Calculate the amount of seconds it's been since the last cast */
    timeFromLastCast(lastCast) {
        return Math.abs((lastCast.getTime() - new Date().getTime()) / 1000);
    }
    targetLocalEntity() {
        if (!this.Target) {
            this.Target = get_nearest_monster({ min_xp: 100, max_att: 120 });
            if (this.Target) {
                change_target(this.Target);
                return true;
            }
            else
                set_message("No Monsters");
        }
        return false;
    }
    targetTankEntity() {
        if (!this.Target && MyParty.getTank() !== null) {
            this.Target = get_target_of(MyParty.getTank());
            if (this.Target)
                return true;
        }
        return false;
    }
    moveToTarget() {
        if (this.Target && !in_attack_range(this.Target)) {
            set_message("Moving to target");
            move(character.x + (this.Target.x - character.x) / 2, character.y + (this.Target.y - character.y) / 2);
        }
    }
    attackTarget() {
        if (this.Target && can_attack(this.Target)) {
            set_message("Attacking");
            attack(this.Target);
        }
    }
    usePotions() {
        if (character.hp < character.max_hp - 200 && can_use("hp"))
            use("hp");
        if (character.mp < character.max_mp - 300 && can_use("mp"))
            use("mp");
    }
    moveToTank() {
        if (MyParty.getTank() !== null) {
            move(MyParty.getTank().real_x, MyParty.getTank().real_y);
        }
    }
}
//# sourceMappingURL=ClassController.js.map