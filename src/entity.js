class Entity {
    constructor(position) {
        this.position = position;
    }

    getCollisions(context) {
        let collidesInX, collidesInY;
        let targetBoundingBox;
        let myBoundingBox = this.getBoundingBox();

        let collisions = [];

        this.newEntities.forEach(currentEntity => {
            targetBoundingBox = currentEntity.getBoundingBox();

            collidesInX = myBoundingBox.width[0].sub(targetBoundingBox.width[0]) < 0 
                            && myBoundingBox.width[1].sub(targetBoundingBox.width[1]) < 0;
            collidesInY = myBoundingBox.height[0].sub(targetBoundingBox.height[0]) < 0 
                            && myBoundingBox.height[1].sub(targetBoundingBox.height[1]) < 0;
        
            collisions.push(currentEntity);
        })

        return collisions;
    }
}