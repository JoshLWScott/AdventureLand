import {ClassController} from "./ClassController";
import {MyParty} from "../Store/MyParty";
import {Skills} from "../Store/Skills";
import {COMBAT_ENABLED, FOCUS_TANK_TARGET} from "../Store/Constants";

class Mage extends ClassController {

    ClassName: string = "Mage";
    Target: any = null;

    LastCast_Energize: Date = new Date();
    LastCast_ManaBurst: Date = new Date();

    constructor() {
        super()
        game_log(`Injected ClassController: ${this.ClassName}`)
    }

    private castEnergize(): void {
        if ( MyParty.getTank() !== null ) {
            if ( this.timeFromLastCast(this.LastCast_Energize) > Skills.Mage.Energize.Cooldown ) {
                game_log(`Casting Energize on: ${MyParty.getTank().name}`);
                this.LastCast_Energize = new Date()
                use_skill(Skills.Mage.Energize.SpellName, MyParty.getTank())
            }
        }
    }

    runClassLoop(): void {

        if ( COMBAT_ENABLED ) {
            /* Energize the tank */
            this.castEnergize()

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

new Mage()