
game_log("AutoLoader: GeneralFunctions Injected")

function sendGoldToMerchant (amount) {
    send_gold(MerchantName, amount)
}

function followLeader () {
    if (!EnableCombat && GroupLeader !== null) {
        move(GroupLeader.real_x, GroupLeader.real_y);
    }
}