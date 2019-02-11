import {ClassController} from "./ClassController";
import {COMBAT_ENABLED, FOCUS_TANK_TARGET} from "../Store/Constants";
import {Skills} from "../Store/Skills";

class Ranger extends ClassController {

    ClassName: string = "Ranger";

    LastCast_Supershot: Date = new Date();

    constructor() {
        super()
        game_log(`Injected ClassController: ${this.ClassName}`)
    }

    private castSupershot(): void {
        if ( this.Target !== null && this.timeFromLastCast(this.LastCast_Supershot) > Skills.Ranger.Supershot.Cooldown ) {
            game_log(`Casting Supershot`);
            this.LastCast_Supershot = new Date()
            use_skill(Skills.Ranger.Supershot.SpellName, this.Target)
        }
    }

    private castThreeShot(): void {
        if ( this.Target !== null && this.character.mp > Skills.Ranger.ThreeShot.ManaCost ) {
            use_skill(Skills.Ranger.ThreeShot.SpellName)
        }
    }

    runClassLoop(): void {
        if ( COMBAT_ENABLED ) {
            FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity();
            this.moveToTarget();
            this.castThreeShot();
            this.castSupershot();
            this.attackTarget();
        }
    }
}

new Ranger();