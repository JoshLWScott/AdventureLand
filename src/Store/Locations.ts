interface INPCDetails {
    map: string
    x: number
    y: number
}

class Monsters {
    public static snake: INPCDetails = {
        map: "main",
        x: 336,
        y: -757
    }
}

export class Locations {
    public static Monsters: Monsters = new Monsters()
}