export function getNPC(name: string, character: Character) : any {
    // @ts-ignore
    let npc = parent.G.maps[character.map].npcs.filter(npc => npc.id == name);
    return npc.length > 0 ? npc[0] : null
}

export function distanceToCoords(x: number, y: number, character: Character): number {
    return Math.sqrt(Math.pow(character.real_x - x, 2) + Math.pow(character.real_y - y, 2));
}

export function countItems(name) {
    return character.items.filter(item => item != null && item.name == name).reduce(function(a,b){ return a + (b["q"] || 1);
    }, 0);
}

export function buyPotions(amount: number, character: Character): void {
    let potion_types = ["hpot0", "mpot0"];
    if(character.esize > 0) {
        potion_types.map((name, index) => {

            // @ts-ignore
            let itemDetails = parent.G.items[name];
            if(itemDetails != null) {
                let totalCost = itemDetails.g * amount;
                if(character.gold >= totalCost) {
                    if(countItems(name) < 100)
                        buy(name, amount);
                }
                else game_log("Not Enough Gold!");
            }
        });
    }
    else game_log("Inventory Full!");

}