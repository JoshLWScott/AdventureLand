import { MY_PARTY_NAMES } from "./Constants";
export class MyParty {
    static inviteMembers() {
        MY_PARTY_NAMES.map(player => player !== character.name ? send_party_invite(player, true) : null);
    }
    static getTank() { return get_player(MY_PARTY_NAMES[0]); }
    static getDPS() { return get_player(MY_PARTY_NAMES[1]); }
    static getHealer() { return get_player(MY_PARTY_NAMES[2]); }
}
//# sourceMappingURL=MyParty.js.map