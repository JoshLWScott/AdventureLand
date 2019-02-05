import {ClassController} from "./ClassController";
import {MyParty} from "../Store/MyParty";
import {Skills} from "../Store/Skills";
import {COMBAT_ENABLED, FOCUS_TANK_TARGET} from "../Store/Constants";

class Mage extends ClassController {

    ClassName: string = "Mage";

    LastCast_Energize: Date = new Date();
    LastCast_ManaBurst: Date = new Date();

    constructor() {
        super()
        game_log(`Injected ClassController: ${this.ClassName}`)
    }

    private castEnergize(target: Player): void {
        if ( target !== null && this.timeFromLastCast(this.LastCast_Energize) > Skills.Mage.Energize.Cooldown ) {
            game_log(`Casting Energize on: ${target.name}`);
            this.LastCast_Energize = new Date()
            use_skill(Skills.Mage.Energize.SpellName, target)
        }
    }

    runClassLoop(): void {

        if ( COMBAT_ENABLED ) {
            FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity()
            this.moveToTarget()
            this.attackTarget()

            this.castEnergize( MyParty.getHealer().mp < MyParty.getHealer().max_mp / 2 ? MyParty.getHealer() : MyParty.getTank() || MyParty.getRanger() )
        }
        else this.moveToTank();
    }
}

new Mage()