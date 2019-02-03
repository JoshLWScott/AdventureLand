/**
 * @author: Josh Scott <joshscottmain@gmail.com>
 * @date  :   03/02/2019
 * @time  :   10:47 AM
 */

/// <reference types="pixi.js" />
/// <reference types="socket.io" />

declare class Player {
    hp: number;                     // health points
    max_hp: number;                 // maximum health points
    mp: number;                     // mana points
    max_mp: number;                 // maximum mana points
    xp: number;                     // current experience points
    name: string;                   // player Name
    angle: number;                  // angle the player is looking at.
    real_x: number;                 // x position on map
    real_y: number;                 // y position on map
    from_x: number | undefined;     // the last movement starting x position of the player
    from_y: number | undefined;     // the last movement starting y position of the player
    going_x: number | undefined;    // the last target x position of the player
    going_y: number | undefined;    // the last target y position of the player
    type: string;                   // the type of the Entity, for a player this is always "character"
    level: number;                  // player level
    owner: string;                  // a number that identifies the account that the player belongs to.
    range: number;                  // range for basic attack
    resistance: number;             // damage resistance
    armor: number;                  // character armor
    attack: number;                 // roughly estimated amount of damage
    afk: boolean;                   // is the player afk
    moving: boolean;                // is player moving
    rip: boolean;                   // player is afk
    code: number | undefined;       // is the player dead
    target: string;                 // the code id the player is running (0 or undefined means he isn't running code)
    ctype: string;                  // EntityId
    skin: string;                   // In what class is the play e.g. "mage"
    frequency: number;              // Character skin
    speed: number;                  // frequency in which the character attacks. A frequency of 1 means every second where as 0.5 means every 2 seconds.
    id: string;                     // walking speed
    in: string;                     // player name
    slots: CharacterSlots;          // On which map the player is
    direction: number;
}
declare class Monster {
    hp:  number;                    // health points
    max_hp: number;                 // maximum health points
    xp: number;                     // Experience awarded for killing this monster
    name: string;                   // entity name (for monsters it is null)
    angle: number;                  // angle the character is looking at.
    direction: number;              // direction in which the character is looking (0:down,1:left,2:right;3:up)
    real_x: number;                 // x position on map
    real_y: number;                 // y position on map
    id: string;                     // the Monster id, All Monsters in entities are listed by there id.
    in: string;                     // the Map name on which map the monster is
    from_x: number | undefined;     // the last movement starting x position of the character
    from_y: number | undefined;     // the last movement starting y position of the character
    going_x: number | undefined;    // the last target x position of the character
    going_y: number | undefined;    // the last target y position of the character
    dead: boolean;                  // is the monster dead
    died: Date;                     // when did the Monster die
    attack: number;                 // the Average attack damage the monster does
    speed: number;                  // the Normal walking speed of the monster. After aggroing
    type: string;                   // the type of the Entity, for monsters this is always "monster"
    c: ChannelingConditions;        // channelling conditions
    s: StatusConditions;            // status conditions
}
declare class Character {
    hp:  number;                                    // health points
    max_hp: number;                                 // maximum health points
    mp: number;                                     // mana points
    max_mp: number;                                 // maximum mana points
    xp: number;                                     // current experience points
    max_xp: number;                                 // total experience points needed for next level
    name: string;                                   // entity name (for monsters it is null)
    angle: number;                                  // angle the character is looking at.
    real_x: number;                                 // x position on map
    x: number;
    real_y: number;                                 // y position on map
    y: number;
    from_x: number | undefined;                     // the last movement starting x position of the character
    from_y: number | undefined;                     // the last movement starting y position of the character
    going_x: number | undefined;                    // the last target x position of the character
    going_y: number | undefined;                    // the last target y position of the character
    level: number;                                  // character level
    owner: string;                                  // character owner //TODO need clarification
    mp_cost: number;                                // mana cost for basic attack
    range: number;                                  // range for basic attack
    resistance: number;                             // the character damage resistance
    attack: number;                                 // roughly estimated amount of damage
    afk: boolean;                                   // is the character afk
    gold: number;                                   // the amount of gold the character carrying
    moving: boolean;                                // is character moving
    rip: boolean;                                   // is the character dead
    code: number | undefined;                       // the code id the character is running (0 or undefined means he isn't running code)
    target: string;                                 // EntityId
    type: string;                                   // the type of the Entity
    ctype: string;                                  // class of the character
    frequency: number;                              // frequency in which the character attacks. A frequency of 1 means every second where as 0.5 means every 2 seconds.
    speed: number;                                  // walking speed
    armor: number;                                  // character armor
    id: string;                                     // character Name
    in: string;                                     // current map name
    cid: number;                                    // -
    stats: CharacterStats;                          // dex,int,vit,str
    goldm: number;                                  // Gold modifier
    luckm: number;                                  // Luck modifier
    xpm: number;                                    // Experience modifier
    map: string;                                    // current map name
    cash: number;                                   // number of shells
    targets: number;                                // How many Entities are targeting this character
    ipass: string;                                  // Authentication token from game server (keep this secret)
    friends: Array<string>;                         // List of Player Ids which whom the player is friends with
    direction: number;                              // Direction in which the character is looking (0:down,1:left,2:right;3:up)
    items: Array<(Consumables|Gear|undefined)>;     // Either a Consumable e.g. a potion or a type of Gear. If the slot is empty the
    slots: CharacterSlots;                          // Contains all the items that the character is wearing
    skin: string;                                   // Character skin
    guild: string;                                  // Character guild (Currently unimplemented)
    isize: number;                                  // Inventory size
    esize: number;                                  // Empty Inventory slots
    me: boolean;                                    // Is this character me
    c: ChannelingConditions;                        // Channelling conditions
    s: StatusConditions ;                           // Status conditions
}

declare class Sprite {
    alpha:  number
    anchor: PIXI.ObservablePoint
    blendMode: number
    cacheAsBitmap: boolean
    children: Array<PIXI.DisplayObject>
    filterArea: PIXI.Rectangle
    // @ts-ignore
    filters: Array<PIXI.Filter>
    height: number
    localTransform: PIXI.Matrix
    mask: PIXI.Graphics | PIXI.Sprite
    parent: PIXI.Container
    pivot: PIXI.Point | PIXI.ObservablePoint
    pluginName: string
    position: PIXI.Point | PIXI.ObservablePoint
    renderable: boolean
    rotation: number
    scale: PIXI.Point | PIXI.ObservablePoint
    // @ts-ignore
    shader: PIXI.Filter | PIXI.Shader
    skew: PIXI.ObservablePoint
    texture: PIXI.Texture
    tint: number
    transform: PIXI.TransformBase
    visible: boolean
    width: number
    worldAlpha: number
    worldTransform: PIXI.Matrix
    worldVisible: boolean
    x: number
    y: number
}

declare class CharacterSlots {
    ring1: Gear;
    ring2: Gear;
    earring1: Gear;
    earring2: Gear;
    belt: Gear;
    offhand: Gear;
    chest: Gear;
    pants: Gear;
    shoes: Gear;
    gloves: Gear;
    amulet: Gear;
    orb: Gear;
    elixir: Gear;
    cape: Gear;
    mainhand: Gear;
    helmet: Gear;
}

declare class Gear {
    name: string;
    level: number;
    CharacterStats?: "dexterity" | "intelligence" | "vitality" | "strength"
}

declare class ChannelingConditions {
    town: boolean
}

declare class StatusConditions {
    stunned: boolean
    cursed: boolean
    poisoned: boolean
    poisonous: boolean
    charging: boolean
    invis: boolean
    invincible: boolean
    mute: boolean
}

declare class CharacterStats {
    dex: number // Dexterity: Increases the attack speed.
    int: number // Intelligence: Increases maximum mana, also increases resistance by a factor of 1.5 for every int point.
    vit: number // Vitality: Increases Health points proportional to level.
    str: number // Strength: Increases Health points and Armor.
}

declare class Consumables {
    name: string    // Item name
    q: number       // quantity: how many items are on this stack.
}

declare class GameMap {
    name:  string;
    on_death: number;
    monsters: Array<Object>;
    compound: Object;
    data: Object;
    doors: Array< Array<any> >; // TODO Figure out what the sub-array needs to be
    drop_norm: number;
    exchange: Object;
    items: Object;
    key: string;
    merchants: Array<object>;
    npcs: Array<Object>;
    quirks: Array< Array<any> >; // TODO Figure out what the sub-array needs to be
    ref: Object;
    u_mid: Array<number>;
    c_mid: Array<number>;
    spawns: Array< Array<any> >; // TODO Figure out what the sub-array needs to be
    transporter: Object;
    upgrade: Object;
}

declare class ItemStats {
    apiercing:  number;
    armor: number;
    attack: number;
    attr0: number;
    attr1: number;
    crit: number;
    dreturn: number;
    evasion: number;
    gold: number;
    hp: number;
    level: number;
    lifesteal: number;
    mp: number;
    range: number;
    reflection: number;
    resistance: number;
    rpiercing: number;
    speed: number;
    stat: number;
    dex: number;
    int: number;
    vit: number;
    str: number ;
}

interface INearestHostile {
    exclude: Array<string>
    friendship?: boolean
}

interface INearestMonster {
    min_xp?: number
    max_att?: number
    type?: string
    no_target?: boolean
    path_check?: boolean
}

declare function activate(num: number): void
declare function attack(target: Player | Monster): void
declare function buy(name: string, quantity: number): void
declare function can_attack(target: Monster | Player): boolean
declare function can_heal(target: Monster | Player): boolean
declare function can_move_to(x: Monster | Player | number, y?: number): boolean
declare function can_use(name: string): boolean
declare function change_target(target: Monster, send?: boolean): void
declare function compound(item0: number, item1: number, item2: number, scroll_num: number, offering_num?: number): void
declare function destroy_item(num: number): void
declare function equip(num: number, slot?: number): void
declare function exchange(item_num: number): void
declare function game_log(message: string, color?: string)
declare function get_map(): GameMap
declare function get_nearest_hostile(args: INearestHostile): Player
declare function get_nearest_monster(args: INearestMonster): Monster
declare function get_player(name: string): Player
declare function get_socket(): SocketIO.Socket
declare function get_target(): Monster | Player | null
declare function get_target_of(entity: Monster | Character | Player): Monster | null
declare function get_targeted_monster(): Monster | null
declare function heal(target: Player): void
declare function in_attack_range(target: Player | Monster): boolean
declare function is_moving(entity: Player | Character | Monster): boolean
declare function is_transporting(entity: Player | Character | Monster): boolean
declare function item_grade(item: {name: string}): number
declare function item_properties(item: Gear): ItemStats | null
declare function item_value(item: Gear | Consumables): number
declare function loot(commander: boolean): void
declare function pm(x: number, y: number): void
declare function move(x: number, y: number): void
declare function say(message: string): void
declare function sell(num: number, quantity: number): void
declare function send_gold(receiver: Player | string, gold: number): void
declare function send_item(receiver: Player | string, num: number, quantity: number): void
declare function send_party_invite(name: Player | string, is_request: boolean): void
declare function set_message(text: string, color?: string): void
declare function shift(num: number, name: string): void
declare function show_json(e: object): void
declare function trade(num: number, trade_slot: number, price: number): void
declare function trade_buy(target: Player, trade_slot: number): void
declare function upgrade(item_num: number, scroll_num: number, offering_num?: number): void
declare function use(name: number | string, target?: Monster): void
declare function use_skill(name: string, target?: Monster | Player | Character): void

declare const character: Character