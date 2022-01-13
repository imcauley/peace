class Entity {
    constructor(position) {
        this.position = position;
    }

    move(position, context) {
        let boundingBox = this.getBoundingBox();

        for (const collidedEntity of this.getCollisions(context)) {
            this.handleCollision(collidedEntity);
        }

        this.position = position;
    }

    * getCollisions(context) {
        let collidesInX, collidesInY;
        let targetBoundingBox;
        let myBoundingBox = this.getBoundingBox();

        for (const currentEntity of context.enemies) {
            if(currentEntity === this) {
                continue;
            }

            collidesInX, collidesInY = true;

            if(!currentEntity.getBoundingBox) {
                continue;
            }

            targetBoundingBox = currentEntity.getBoundingBox();

            if(myBoundingBox.right < targetBoundingBox.left || myBoundingBox.left > targetBoundingBox.right) {
                collidesInY = false;
            }

            if(myBoundingBox.top < targetBoundingBox.bottom || myBoundingBox.bottom > targetBoundingBox.top) {
                collidesInY = false;
            }


            if (collidesInY || collidesInX) {
                yield currentEntity;
            }
        }

    }
}