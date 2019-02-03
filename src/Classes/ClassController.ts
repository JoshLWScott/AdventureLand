import {FOLLOW_TANK} from "../Store/Constants";
import {MyParty} from "../Store/MyParty";

export abstract class ClassController {

    abstract ClassName: string;
    abstract Target: Player | Monster | Character;
    abstract runClassLoop(): void

    protected constructor() {
        setInterval(() => {
            if(character.rip || is_moving(character)) return;

            loot(true);

            this.Target = get_targeted_monster();
            this.usePotions();

            if ( FOLLOW_TANK )
                this.moveToTank()


            this.runClassLoop()
        }, 1000 / 4)
    }

    /* Calculate the amount of seconds it's been since the last cast */
    public timeFromLastCast( lastCast: Date ): number {
        return Math.abs( (lastCast.getTime() - new Date().getTime()) / 1000 )
    }

    public targetLocalEntity(): void {
        if(!this.Target) {
            game_log("Attempting to find a local target")
            this.Target = get_nearest_monster({min_xp:100,max_att:150});
            if (this.Target) { change_target(this.Target) }
            else set_message("No Monsters");
        }
    }

    public targetTankEntity(): void {
        if ( !this.Target && MyParty.getTank() !== null ) {
            this.Target = get_target_of(MyParty.getTank())
        }
    }

    public moveToTarget(): void {
        if( this.Target !== null && !in_attack_range(this.Target) ) {
            set_message("Moving to target")
            move(
                character.x+(this.Target.real_x-character.x)/2,
                character.y+(this.Target.real_y-character.y)/2
            );
        }
    }

    public attackTarget(): void {
        if(this.Target !== null && can_attack(this.Target)) {
            set_message(`Attacking: ${this.Target.name}`);
            attack(this.Target);
        }
    }

    public usePotions(): void {
        if ( character.hp < character.max_hp - 200 && can_use("hp") )
            use("hp")
        if ( character.mp < character.max_mp - 300 && can_use("mp") )
            use("mp")
    }

    public moveToTank(): void {
        if ( MyParty.getTank() !== null ) {
            move(
                MyParty.getTank().real_x,
                MyParty.getTank().real_y,
            );
        }
    }
}

