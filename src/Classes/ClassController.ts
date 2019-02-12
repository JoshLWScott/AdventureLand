import {MyParty} from "../Store/MyParty";
import {buyPotions, countItems, distanceToCoords, getNPC} from "../Helpers";
import {Locations} from "../Store/Locations";

export abstract class ClassController {

    public TargetName: string = "";
    public Target: Player | Monster | Character;
    public isMovingToLocation: boolean = false;
    public isResupplying: boolean = false;
    public character: Character = null;

    abstract ClassName: string;
    abstract runClassLoop(): void;

    /* Exp Timer Stuff */
    private minute_refresh: any;
    private last_minutes_checked: Date = new Date();
    private last_xp_checked_minutes: number = character.xp;
    private last_xp_checked_kill: number = character.xp;


    protected constructor() {
        this.init_xptimer(1);
        setInterval(() => {

            this.character = character;

            if(this.character.rip || is_moving(this.character)) return;

            loot(true);

            this.checkSupplies();

            if ( !this.isResupplying && !this.isMovingToLocation ) {
                this.Target = get_targeted_monster();

                if ( this.Target.name !== this.TargetName )
                    this.TargetName = this.Target.name;

                this.moveToFarmLocation();
                this.usePotions();
                this.runClassLoop();
            }

            this.update_xptimer();
        }, 1000 / 4)
    }


    private moveToFarmLocation(): void {
        let target = Locations.Monsters["snake"]
        if ( target !== null && target !== undefined && distanceToCoords(target.x, target.y, this.character) < 50 ) {
            this.isMovingToLocation = true;
            smart_move({ map: target.map, x: target.x, y: target.y })
        }
        else this.isMovingToLocation = false
    }


    public checkSupplies(): void {
        let requiredSupplies = ["hpot0", "mpot0"];
        requiredSupplies.map(item => {

            if (countItems(item) < 100)
                this.resupplyPotions()
            else this.isResupplying = false
        })
    }

    public resupplyPotions(): void {

        this.isResupplying = true;

        let distanceToMerchant = null;
        let potionMerchant = getNPC("fancypots", this.character);

        if(potionMerchant != null)
            distanceToMerchant = distanceToCoords(potionMerchant.position[0], potionMerchant.position[1], this.character);

        // @ts-ignore
        if (!smart.moving && (distanceToMerchant == null || distanceToMerchant > 100))
            smart_move({ to:"potions"});

        if(distanceToMerchant != null && distanceToMerchant < 100)
            buyPotions(1000, this.character)
    }

    /* Calculate the amount of seconds it's been since the last cast */
    public timeFromLastCast( lastCast: Date ): number {
        return Math.abs( (lastCast.getTime() - new Date().getTime()) / 1000 )
    }

    public targetLocalEntity(): void {
        if(!this.Target) {
            this.Target = get_nearest_monster({type: this.TargetName});
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
                this.character.x+(this.Target.real_x - this.character.x)/2,
                this.character.y+(this.Target.real_y - this.character.y)/2
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
        if ( this.character.hp < this.character.max_hp - 200 && can_use("hp") )
            use("hp")
        if ( this.character.mp < this.character.max_mp - 300 && can_use("mp") )
            use("mp")
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
        if (this.character.xp == this.last_xp_checked_kill) return;

        // @ts-ignore
        let $ = parent.$;
        let now = new Date();

        let time = Math.round((now.getTime() - this.last_minutes_checked.getTime()) / 1000);
        if (time < 1) return; // 1s safe delay
        let xp_rate = Math.round((this.character.xp - this.last_xp_checked_minutes) / time);
        if (time > 60 * this.minute_refresh) {
            this.last_minutes_checked = new Date();
            this.last_xp_checked_minutes = this.character.xp;
        }
        this.last_xp_checked_kill = this.character.xp;

        // @ts-ignore
        let xp_missing = parent.G.levels[this.character.level] - this.character.xp;
        let seconds = Math.round(xp_missing / xp_rate);
        let minutes = Math.round(seconds / 60);
        let hours = Math.round(minutes / 60);
        let counter = `${hours}h ${minutes % 60}min`;

        $('#xpcounter').text(counter);
        $('#xprate').text(`${xp_rate} XP/s`);
    }


}

