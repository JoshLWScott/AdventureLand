import {ClassController} from "./ClassController";
import {COMBAT_ENABLED, FOCUS_TANK_TARGET} from "../Store/Constants";

class Ranger extends ClassController {

    ClassName: string = "Ranger";
    Target: Player | Monster | Character = null;


    constructor() {
        super()
        game_log(`Injected ClassController: ${this.ClassName}`)
    }

    runClassLoop(): void {

        if ( COMBAT_ENABLED ) {
            FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity()
            this.moveToTarget()
            this.attackTarget()
        }
        else this.moveToTank();
    }
}

new Ranger()