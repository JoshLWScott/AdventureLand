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
        this.Curse = {
            NiceName: "Curse",
            SpellName: "curse",
            Cooldown: 5
        };
    }
    return Priest;
}());
var Ranger = /** @class */ (function () {
    function Ranger() {
        this.Supershot = {
            NiceName: "Supershot",
            SpellName: "supershot",
            Cooldown: 30
        };
        this.ThreeShot = {
            NiceName: "3 Shot",
            SpellName: "3shot",
            Cooldown: 0.25,
            ManaCost: 300
        };
    }
    return Ranger;
}());
var Skills = /** @class */ (function () {
    function Skills() {
    }
    Skills.Mage = new Mage();
    Skills.Warrior = new Warrior();
    Skills.Priest = new Priest();
    Skills.Ranger = new Ranger();
    return Skills;
}());
export { Skills };
