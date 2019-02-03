import { ClassController } from "./ClassController";
import { MyParty } from "../Store/MyParty";
import { Skills } from "../Store/Skills";
import { COMBAT_ENABLED, FOCUS_TANK_TARGET } from "../Store/Constants";
class Mage extends ClassController {
    constructor() {
        super();
        this.ClassName = "Mage";
        this.Target = null;
        this.LastCast_Energize = new Date();
        this.LastCast_ManaBurst = new Date();
        game_log(`Injected ClassController: ${this.ClassName}`);
    }
    castEnergize() {
        if (MyParty.getTank() !== null) {
            game_log(`Last Energize ${this.timeFromLastCast(this.LastCast_Energize)} seconds ago`);
            if (this.timeFromLastCast(this.LastCast_Energize) > Skills.Mage.Energize.Cooldown) {
                this.LastCast_Energize = new Date();
                use_skill(Skills.Mage.Energize.SpellName, MyParty.getTank());
            }
        }
    }
    runClassLoop() {
        if (COMBAT_ENABLED) {
            /* Energize the tank */
            this.castEnergize();
            if (FOCUS_TANK_TARGET)
                if (!this.targetTankEntity())
                    return;
                else if (!this.targetLocalEntity())
                    return;
            this.moveToTarget();
            this.attackTarget();
        }
        else
            this.moveToTank();
    }
}
new Mage();
//# sourceMappingURL=Mage.js.map