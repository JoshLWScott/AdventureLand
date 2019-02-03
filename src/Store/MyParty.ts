export class MyParty {
    public static inviteMembers() {
        MY_PARTY_NAMES.map(player => player !== character.name ? send_party_invite(player, true) : null )
    }
    public static getTank() { return get_player(MY_PARTY_NAMES[0]) }
    public static getDPS() { return get_player(MY_PARTY_NAMES[1]) }
    public static getHealer() { return get_player(MY_PARTY_NAMES[2]) }
}
