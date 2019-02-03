import {ClassController} from "./ClassController";
import {COMBAT_ENABLED, FOCUS_TANK_TARGET} from "../Store/Constants";

class Priest extends ClassController {

    ClassName: string = "Priest";
    Target: any = null;

    LastCast_Energize: Date = new Date();
    LastCast_ManaBurst: Date = new Date();

    constructor() {
        super()
        game_log(`Injected ClassController: ${this.ClassName}`)
    }

    runClassLoop(): void {

        if ( COMBAT_ENABLED ) {

            if ( FOCUS_TANK_TARGET )
                if ( !this.targetTankEntity() ) return
            else
                if ( !this.targetLocalEntity() ) return

            this.moveToTarget()
            this.attackTarget()
        }
        else this.moveToTank();
    }
}

new Priest()