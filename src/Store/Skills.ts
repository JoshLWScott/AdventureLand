interface ISpell {
    NiceName: string
    SpellName: string,
    Cooldown: number
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

class Priest {}

export class Skills {
    public static Mage: Mage = new Mage()
    public static Warrior: Warrior = new Warrior()
    public static Priest: Priest = new Priest()
}



