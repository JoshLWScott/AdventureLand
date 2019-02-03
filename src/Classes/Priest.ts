import {ClassController} from "./ClassController";
import {COMBAT_ENABLED, FOCUS_TANK_TARGET, MY_PARTY_NAMES} from "../Store/Constants";

class Priest extends ClassController {

    ClassName: string = "Priest";
    Target: any = null;

    readonly minHealPercentage = 0.80

    HealTarget: Player = null;
    HealWeight: number = null;



    constructor() {
        super()
        game_log(`Injected ClassController: ${this.ClassName}`)
    }

    private healPartyMember(): boolean {
        MY_PARTY_NAMES.map( playerName => {
            let player = get_player(playerName);
            if (player !== null && can_heal(player) &&
                player.hp < player.max_hp * this.minHealPercentage &&
                this.HealWeight === null || player.hp / player.max_hp * 100 < this.HealWeight ) {
                this.HealWeight = player.hp / player.max_hp * 100
                this.HealTarget = player
            }
        })

        if ( this.HealTarget !== null ) {
            game_log(`Healing: ${this.HealTarget.name}`)
            heal(this.HealTarget);
            return true
        }

        return false
    }

    runClassLoop(): void {

        if ( this.healPartyMember() ) return

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