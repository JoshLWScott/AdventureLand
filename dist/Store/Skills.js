var Mage = /** @class */ (function () {
    function Mage() {
        this.ManaBurst = {
            NiceName: "Mana Burst",
            SpellName: "burst",
            Cooldown: 6,
        };
        this.Energize = {
            NiceName: "Energize",
            SpellName: "energize",
            Cooldown: 4
        };
    }
    return Mage;
}());
var Warrior = /** @class */ (function () {
    function Warrior() {
    }
    return Warrior;
}());
var Priest = /** @class */ (function () {
    function Priest() {
    }
    return Priest;
}());
var Skills = /** @class */ (function () {
    function Skills() {
    }
    Skills.Mage = new Mage();
    Skills.Warrior = new Warrior();
    Skills.Priest = new Priest();
    return Skills;
}());
export { Skills };
