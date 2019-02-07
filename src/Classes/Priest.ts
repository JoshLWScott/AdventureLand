import {ClassController} from "./ClassController";
import {COMBAT_ENABLED, FOCUS_TANK_TARGET, MY_PARTY_NAMES} from "../Store/Constants";
import {Skills} from "../Store/Skills";

class Priest extends ClassController {

    readonly minHealPercentage = 0.80
    readonly curseTargetMaxHealth = 1000

    ClassName: string = "Priest";

    HealTarget: Player = null;
    HealWeight: number = null;

    LastCast_Curse: Date = new Date();

    constructor() {
        super()
        game_log(`Injected ClassController: ${this.ClassName}`)
    }

    private healPartyMember(): boolean {

        this.HealTarget = null
        this.HealWeight = null

        MY_PARTY_NAMES.map( playerName => {
            let player = get_player(playerName);

            if (player !== null && can_heal(player) &&
                player.hp < player.max_hp * this.minHealPercentage &&
                this.HealTarget === null ) {
                this.HealTarget = player
            }
        })

        if ( this.HealTarget !== null && can_heal(this.HealTarget) ) {
            game_log(`Healing: ${this.HealTarget.name}`)
            heal(this.HealTarget);
            return true
        }

        return false
    }

    // @ts-ignore
    private curseTarget(): void {
        if ( this.Target !== null &&
            this.timeFromLastCast(this.LastCast_Curse) > Skills.Priest.Curse.Cooldown &&
            this.curseTargetMaxHealth <= this.Target.max_hp ) {
            game_log(`Cursing: ${this.Target.name}`)
            use_skill(Skills.Priest.Curse.SpellName, this.Target)
        }
    }

    runClassLoop(): void {

        if ( this.healPartyMember() ) return

        if ( COMBAT_ENABLED ) {
            FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity()
            this.moveToTarget()

            // this.curseTarget()
            this.attackTarget()

        }
    }
}

new Priest()