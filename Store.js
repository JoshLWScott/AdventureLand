game_log("AutoLoader: Store Injected")

/* General Variables */
var EnableCombat = true
var MerchantName = "Scarlet"
var minHealPercentage = 0.99

/* List of all our characters */
var PartyMembers = [
    "Besides", // Tank - Warrior
    "Motivation", // DPS - Mage
    "Purity", // Healer - Priest
]


var Party = {
    inviteMembers: () => {
        PartyMembers.map(player => {
            if ( player !== character.name )
                send_party_invite(player, true)
        })
    },
    getTank: () => get_player(PartyMembers[0]),
    getDPS: () => get_player(PartyMembers[1]),
    getHealer: () => get_player(PartyMembers[2])
}