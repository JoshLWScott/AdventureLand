var MyParty = /** @class */ (function () {
    function MyParty() {
    }
    MyParty.inviteMembers = function () {
        MY_PARTY_NAMES.map(function (player) { return player !== character.name ? send_party_invite(player, true) : null; });
    };
    MyParty.getTank = function () { return get_player(MY_PARTY_NAMES[0]); };
    MyParty.getDPS = function () { return get_player(MY_PARTY_NAMES[1]); };
    MyParty.getHealer = function () { return get_player(MY_PARTY_NAMES[2]); };
    return MyParty;
}());
export { MyParty };
