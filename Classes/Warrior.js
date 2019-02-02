game_log("AutoLoader: Warrior Class Script Injected")


game_log("Attempting to create a party")
Party.inviteMembers();

setInterval(function(){

    use_hp_or_mp();
    loot();

    if(!EnableCombat || character.rip || is_moving(character)) return;

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