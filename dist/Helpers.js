export function get_npc(name, character) {
    // @ts-ignore
    var npc = parent.G.maps[character.map].npcs.filter(function (npc) { return npc.id == name; });
    return npc.length > 0 ? npc[0] : null;
}
export function distanceToCoords(x, y, character) {
    return Math.sqrt(Math.pow(character.real_x - x, 2) + Math.pow(character.real_y - y, 2));
}
export function countItems(name) {
    return character.items.filter(function (item) { return item != null && item.name == name; }).reduce(function (a, b) {
        return a + (b["q"] || 1);
    }, 0);
}
export function buyPotions(amount, character) {
    var potion_types = ["hpot0", "mpot0"];
    if (character.esize > 0) {
        potion_types.map(function (name, index) {
            // @ts-ignore
            var itemDetails = parent.G.items[name];
            if (itemDetails != null) {
                var totalCost = itemDetails.g * amount;
                if (character.gold >= totalCost) {
                    if (countItems(name) < 100)
                        buy(name, amount);
                }
                else
                    game_log("Not Enough Gold!");
            }
        });
    }
    else {
        game_log("Inventory Full!");
    }
}
