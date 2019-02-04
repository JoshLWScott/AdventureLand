import { MY_PARTY_NAMES } from "./Constants";
var MyParty = /** @class */ (function () {
    function MyParty() {
    }
    MyParty.inviteMembers = function () {
        MY_PARTY_NAMES.map(function (player) { return player !== character.name ? send_party_invite(player, true) : null; });
    };
    MyParty.getTank = function () { return get_player(MY_PARTY_NAMES[0]); };
    MyParty.getMage = function () { return get_player(MY_PARTY_NAMES[1]); };
    MyParty.getRanger = function () { return get_player(MY_PARTY_NAMES[2]); };
    MyParty.getHealer = function () { return get_player(MY_PARTY_NAMES[3]); };
    return MyParty;
}());
export { MyParty };
