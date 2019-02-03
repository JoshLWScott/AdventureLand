interface ISpell {
    NiceName: string
    SpellName: string,
    Cooldown: number
}

class IMage {
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

class IWarrior {}

class IPriest {}

class Skills {
    public static Mage: IMage = new IMage()
    public static Warrior: IWarrior = new IWarrior()
    public static Priest: IPriest = new IPriest()
}