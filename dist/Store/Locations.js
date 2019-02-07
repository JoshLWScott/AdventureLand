var Monsters = /** @class */ (function () {
    function Monsters() {
    }
    Monsters.snake = {
        map: "main",
        x: 336,
        y: -757
    };
    return Monsters;
}());
var Locations = /** @class */ (function () {
    function Locations() {
    }
    Locations.Monsters = new Monsters();
    return Locations;
}());
export { Locations };
