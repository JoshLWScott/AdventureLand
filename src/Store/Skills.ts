interface ISpell {
    NiceName: string
    SpellName: string,
    Cooldown: number,
    ManaCost?: number
}

class Mage {
    public ManaBurst: ISpell = {
        NiceName: "Mana Burst",
        SpellName: "burst",
        Cooldown: 6,
    }
    public Energize: ISpell = {
        NiceName: "Energize",
        SpellName: "energize",
        Cooldown: 4
    }
}

class Warrior {}

class Priest {

    public Curse: ISpell = {
        NiceName: "Curse",
        SpellName: "curse",
        Cooldown: 5
    }

}

class Ranger {
    public Supershot: ISpell = {
        NiceName: "Supershot",
        SpellName: "supershot",
        Cooldown: 30
    }

    public ThreeShot: ISpell = {
        NiceName: "3 Shot",
        SpellName: "3shot",
        Cooldown: 0.25,
        ManaCost: 300
    }
}


export class Skills {
    public static Mage: Mage = new Mage()
    public static Warrior: Warrior = new Warrior()
    public static Priest: Priest = new Priest()
    public static Ranger: Ranger = new Ranger()
}



