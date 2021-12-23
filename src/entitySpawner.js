class EntitySpawner {
    constructor(entityType, position) {
        this.entityType = entityType;
        this.position = position;
    }

    canSpawn(context) {
        return context.tick > 100 && context.tick < 120;
    }

    spawnEntities() {
        let e = new this.entityType(this.position);
        return [e];
    }
}