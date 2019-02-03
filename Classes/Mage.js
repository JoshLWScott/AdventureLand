game_log("AutoLoader: Mage Class Script Injected")

var lastEnergizeCast = new Date();

setInterval(function(){

    loot();

    if(!EnableCombat || character.rip || is_moving(character)) return;

    if (!EnableCombat) { followLeader(); return; }

    betterPotionUsage()


    if ( Party.getTank() !== null ) {

        var timeFromLastCast = Math.abs( (lastEnergizeCast.getTime() - new Date().getTime()) / 1000 );

        game_log(`Last casted ${timeFromLastCast} seconds ago`);

        if ( timeFromLastCast > 4 )
            use_skill("energize", Party.getTank())
    }

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