import {ClassController} from "./ClassController";
import {COMBAT_ENABLED} from "../Store/Constants";

class Warrior extends ClassController {

    ClassName: string = "Warrior";
    Target: any = null;

    constructor() {
        super()
        game_log(`Injected ClassController: ${this.ClassName}`)
    }

    runClassLoop(): void {

        if ( COMBAT_ENABLED ) {
            this.targetLocalEntity()
            this.moveToTarget()
            this.attackTarget()
        }
    }
}

new Warrior()