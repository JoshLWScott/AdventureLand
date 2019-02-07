import { MyParty } from "../Store/MyParty";
import { buyPotions, countItems, distanceToCoords, get_npc } from "../Helpers";
import { Locations } from "../Store/Locations";
var ClassController = /** @class */ (function () {
    function ClassController() {
        var _this = this;
        this.TargetName = "snake";
        this.isMovingToLocation = false;
        this.isResupplying = false;
        this.character = null;
        this.last_minutes_checked = new Date();
        this.last_xp_checked_minutes = character.xp;
        this.last_xp_checked_kill = character.xp;
        this.init_xptimer(1);
        setInterval(function () {
            _this.character = character;
            if (_this.character.rip || is_moving(_this.character))
                return;
            loot(true);
            _this.checkSupplies();
            if (!_this.isResupplying && !_this.isMovingToLocation) {
                _this.Target = get_targeted_monster();
                _this.moveToFarmLocation();
                _this.usePotions();
                _this.runClassLoop();
            }
            _this.update_xptimer();
        }, 1000 / 4);
    }
    ClassController.prototype.moveToFarmLocation = function () {
        var target = Locations.Monsters["snake"];
        if (target !== null && target !== undefined && distanceToCoords(target.x, target.y, this.character) < 50) {
            this.isMovingToLocation = true;
            smart_move({ map: target.map, x: target.x, y: target.y });
        }
        else
            this.isMovingToLocation = false;
    };
    ClassController.prototype.checkSupplies = function () {
        var _this = this;
        var requiredSupplies = ["hpot0", "mpot0"];
        requiredSupplies.map(function (item) {
            if (countItems(item) < 100)
                _this.resupplyPotions();
            else
                _this.isResupplying = false;
        });
    };
    ClassController.prototype.resupplyPotions = function () {
        this.isResupplying = true;
        var distanceToMerchant = null;
        var potionMerchant = get_npc("fancypots", this.character);
        if (potionMerchant != null)
            distanceToMerchant = distanceToCoords(potionMerchant.position[0], potionMerchant.position[1], this.character);
        // @ts-ignore
        if (!smart.moving && (distanceToMerchant == null || distanceToMerchant > 100))
            smart_move({ to: "potions" });
        if (distanceToMerchant != null && distanceToMerchant < 100)
            buyPotions(1000, this.character);
    };
    /* Calculate the amount of seconds it's been since the last cast */
    ClassController.prototype.timeFromLastCast = function (lastCast) {
        return Math.abs((lastCast.getTime() - new Date().getTime()) / 1000);
    };
    ClassController.prototype.targetLocalEntity = function () {
        if (!this.Target) {
            this.Target = get_nearest_monster({ type: this.TargetName });
            if (this.Target) {
                change_target(this.Target);
            }
            else
                set_message("No Monsters");
        }
    };
    ClassController.prototype.targetTankEntity = function () {
        if (!this.Target && MyParty.getTank() !== null) {
            this.Target = get_target_of(MyParty.getTank());
        }
    };
    ClassController.prototype.moveToTarget = function () {
        if (this.Target !== null && !in_attack_range(this.Target)) {
            set_message("Moving to target");
            move(this.character.x + (this.Target.real_x - this.character.x) / 2, this.character.y + (this.Target.real_y - this.character.y) / 2);
        }
    };
    ClassController.prototype.attackTarget = function () {
        if (this.Target !== null && can_attack(this.Target)) {
            set_message("Attacking: " + this.Target.name);
            attack(this.Target);
        }
    };
    ClassController.prototype.usePotions = function () {
        if (this.character.hp < this.character.max_hp - 200 && can_use("hp"))
            use("hp");
        if (this.character.mp < this.character.max_mp - 300 && can_use("mp"))
            use("mp");
    };
    /* TODO: Move this to it's own class */
    ClassController.prototype.init_xptimer = function (minref) {
        this.minute_refresh = minref || 1;
        // @ts-ignore
        parent.add_log(this.minute_refresh.toString() + ' min until refresh!', 0x00FFFF);
        // @ts-ignore
        var $ = parent.$;
        var brc = $('#bottomrightcorner');
        brc.find('#xptimer').remove();
        var xpt_container = $('<div id="xptimer"></div>').css({
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
        var xptimer = $('<div id="xptimercontent"></div>')
            .css({
            display: 'table-cell',
            verticalAlign: 'middle'
        })
            .html('Estimated time until level up:<br><span id="xpcounter" style="font-size: 40px !important; line-height: 28px">Loading...</span><br><span id="xprate">(Kill something!)</span>')
            .appendTo(xpt_container);
        brc.prepend(xpt_container);
    };
    ClassController.prototype.update_xptimer = function () {
        if (this.character.xp == this.last_xp_checked_kill)
            return;
        // @ts-ignore
        var $ = parent.$;
        var now = new Date();
        var time = Math.round((now.getTime() - this.last_minutes_checked.getTime()) / 1000);
        if (time < 1)
            return; // 1s safe delay
        var xp_rate = Math.round((this.character.xp - this.last_xp_checked_minutes) / time);
        if (time > 60 * this.minute_refresh) {
            this.last_minutes_checked = new Date();
            this.last_xp_checked_minutes = this.character.xp;
        }
        this.last_xp_checked_kill = this.character.xp;
        // @ts-ignore
        var xp_missing = parent.G.levels[this.character.level] - this.character.xp;
        var seconds = Math.round(xp_missing / xp_rate);
        var minutes = Math.round(seconds / 60);
        var hours = Math.round(minutes / 60);
        var counter = hours + "h " + minutes % 60 + "min";
        $('#xpcounter').text(counter);
        $('#xprate').text(xp_rate + " XP/s");
    };
    return ClassController;
}());
export { ClassController };
