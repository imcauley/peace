class Entity {
    constructor(position) {
        this.position = position;
    }

    move(position, context) {
        let boundingBox = this.getBoundingBox();
        this.position = position;

        for (const collidedEntity of this.getCollisions(context)) {
            this.handleCollision(collidedEntity);
        }
    }

    * getCollisions(context) {
        let collides;
        let targetBoundingBox;
        let myBoundingBox = this.getBoundingBox();

        for (const currentEntity of context.entities()) {
            collides = false;

            if(currentEntity === this) {
                continue;
            }

            if(!currentEntity.getBoundingBox) {
                continue;
            }

            targetBoundingBox = currentEntity.getBoundingBox();

            if(
                myBoundingBox.left < targetBoundingBox.right &&
                myBoundingBox.right > targetBoundingBox.left &&
                myBoundingBox.bottom < targetBoundingBox.top &&
                myBoundingBox.top > targetBoundingBox.bottom 
            ) {
                yield {
                    entity: currentEntity,
                    direction: 'y'
                };
            }
        }

    }
}