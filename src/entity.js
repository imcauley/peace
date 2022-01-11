class Entity {
    constructor(position) {
        this.position = position;
    }

    move(position, context) {
        let boundingBox = this.getBoundingBox();

        for (const collidedEntity of this.getCollisions(context)) {
            if(boundingBox.bottom < collidedEntity.top) {
                position.y -= collidedEntity.height/2;
            }

            if(boundingBox.top > collidedEntity.bottom) {
                position.y += collidedEntity.height/2;
            }

            if(boundingBox.right < collidedEntity.left) {
                position.x -= collidedEntity.width/2;
            }

            if(boundingBox.left > collidedEntity.right) {
                position.x += collidedEntity.width/2;
            }
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
                this.color = new Color(1,.2,.2);
                yield targetBoundingBox;
            }
            else {
                this.color = new Color(1,1,.2);
            }
        }

    }
}