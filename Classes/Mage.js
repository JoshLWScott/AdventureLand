game_log("AutoLoader: Mage Class Script Injected")

setInterval(function(){

    betterPotionUsage()
    loot();

    if(!EnableCombat || character.rip || is_moving(character)) return;

    if (!EnableCombat) { followLeader(); return; }


    setInterval(() => {
        Party.getTank() !== null ? use_skill("energize", Party.getTank()) : null
    }, 4000)


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