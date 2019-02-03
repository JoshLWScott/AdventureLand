game_log("AutoLoader: Priest Class Script Injected")

function tryHealParty() {

    let healTarget = null
    let healWeight = null

    PartyMembers.forEach( playerName => {
        let player = get_player(playerName);
        if (player !== null && can_heal(player) &&
            player.hp < player.max_hp * minHealPercentage &&
            healWeight === null || player.hp / player.max_hp * 100 < healWeight ) {
            healWeight = player.hp / player.max_hp * 100
            healTarget = player
        }
    });


    if ( healTarget !== null ) {
        game_log(`Healing: ${healTarget.name}`)
        heal(healTarget);
        return true
    }

    return false
}

setInterval(function(){

    betterPotionUsage()
    loot();

    if(!EnableCombat || character.rip || is_moving(character)) return;

    if ( tryHealParty() ) return;

    var target=get_targeted_monster();
    if(!target)
    {
        target=get_nearest_monster({min_xp:100,max_att:120});
        if(target) change_target(target);
        else {
            set_message("No Monsters");
            return;
        }
    }

    if(!in_attack_range(target)) {
        // Walk half the distance
        move(
            character.x+(target.x-character.x)/2,
            character.y+(target.y-character.y)/2
        );
    }
    else if(can_attack(target)) {
        set_message("Attacking");
        attack(target);
    }

},1000/4); // Loops every 1/4 seconds.