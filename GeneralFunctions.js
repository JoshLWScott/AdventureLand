
game_log("AutoLoader: GeneralFunctions Injected")

function sendGoldToMerchant (amount) {
    send_gold(MerchantName, amount)
}

function followLeader () {
    if (!EnableCombat && Party.getTank() !== null) {
        move(GroupLeader.real_x, GroupLeader.real_y);
    }
}

function betterPotionUsage() {
    character.hp < character.max_hp - 200 ? use("hp") : null
    character.mp < character.max_mp - 300 ? use("mp") : null
}