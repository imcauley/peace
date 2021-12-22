class GameContext {
    constructor() {
        this.tick = 0;
        this.enemies = [];
        this.ship = 0;
    }

    entities() {
        return this.enemies;
    }

    update() {
        this.tick += 1;
        var self = this;

        this.enemies.forEach(element => {
            element.update(self);
        });
    }

    draw() {
        this.enemies.forEach(element => {
            element.draw();
        });

        this.ship.draw();
    }
}