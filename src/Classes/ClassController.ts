import {FOLLOW_TANK} from "../Store/Constants";
import {MyParty} from "../Store/MyParty";

export abstract class ClassController {

    readonly TargetName: string = "bee";

    abstract ClassName: string;
    abstract Target: Player | Monster | Character;
    abstract runClassLoop(): void

    /* Exp Timer Stuff */
    private minute_refresh: any;
    private last_minutes_checked: Date = new Date();
    private last_xp_checked_minutes: number = character.xp
    private last_xp_checked_kill: number = character.xp

    protected constructor() {
        this.init_xptimer(1);
        setInterval(() => {
            if(character.rip || is_moving(character)) return;

            loot(true);

            this.Target = get_targeted_monster();
            this.usePotions();

            if ( FOLLOW_TANK )
                this.moveToTank()


            this.runClassLoop()
            this.update_xptimer()
        }, 1000 / 4)
    }

    /* Calculate the amount of seconds it's been since the last cast */
    public timeFromLastCast( lastCast: Date ): number {
        return Math.abs( (lastCast.getTime() - new Date().getTime()) / 1000 )
    }

    public targetLocalEntity(): void {
        if(!this.Target) {
            this.Target = get_nearest_monster({min_xp:100,max_att:200, type: this.TargetName});
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

    /* TODO: Move this to it's own class */
    private init_xptimer(minref): void {
        this.minute_refresh = minref || 1;
        // @ts-ignore
        parent.add_log(this.minute_refresh.toString() + ' min until refresh!', 0x00FFFF);

        // @ts-ignore
        let $ = parent.$;
        let brc = $('#bottomrightcorner');

        brc.find('#xptimer').remove();

        let xpt_container = $('<div id="xptimer"></div>').css({
            background: 'black',
            border: 'solid gray',
            borderWidth: '5px 5px',
            width: '320px',
            height: '96px',
            fontSize: '28px',
            color: '#77EE77',
            textAlign: 'center',
            display: 'table',
            overflow: 'hidden',
            marginBottom: '16px'
        });

        //vertical centering in css is fun
        // @ts-ignore
        let xptimer = $('<div id="xptimercontent"></div>')
            .css({
                display: 'table-cell',
                verticalAlign: 'middle'
            })
            .html('Estimated time until level up:<br><span id="xpcounter" style="font-size: 40px !important; line-height: 28px">Loading...</span><br><span id="xprate">(Kill something!)</span>')
            .appendTo(xpt_container);

        brc.prepend(xpt_container);
    }

    private update_xptimer(): void {
        if (character.xp == this.last_xp_checked_kill) return;

        // @ts-ignore
        let $ = parent.$;
        let now = new Date();

        let time = Math.round((now.getTime() - this.last_minutes_checked.getTime()) / 1000);
        if (time < 1) return; // 1s safe delay
        let xp_rate = Math.round((character.xp - this.last_xp_checked_minutes) / time);
        if (time > 60 * this.minute_refresh) {
            this.last_minutes_checked = new Date();
            this.last_xp_checked_minutes = character.xp;
        }
        this.last_xp_checked_kill = character.xp;

        // @ts-ignore
        let xp_missing = parent.G.levels[character.level] - character.xp;
        let seconds = Math.round(xp_missing / xp_rate);
        let minutes = Math.round(seconds / 60);
        let hours = Math.round(minutes / 60);
        let counter = `${hours}h ${minutes % 60}min`;

        $('#xpcounter').text(counter);
        $('#xprate').text(`${xp_rate} XP/s`);
    }

}

