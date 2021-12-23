class GameContext {
    constructor() {
        this.tick = 0;

        this.spawners = [];
        this.enemies = [];
        this.ship = 0;

        this.gameStick = vec2(0,0);

        this.ship = new Ship();
        this.spawners.push(new EntitySpawner(Enemy, vec2(0,0)));
        // this.enemies.push(new Enemy());
    }

    entities() {
        return this.enemies;
    }

    update() {
        var self = this;

        this.spawnNewEntities();

        this.enemies.forEach(element => {
            element.update(self);
        });

        this.ship.update(self);

        this.tick += 1;
    }

    draw() {
        this.enemies.forEach(element => {
            element.draw();
        });

        this.ship.draw();
    }

    spawnNewEntities() {
        let context = this;

        this.spawners.forEach(spawner => {
            if(spawner.canSpawn(context)) {
                this.enemies.push(...spawner.spawnEntities());
            }
        });
    }
}