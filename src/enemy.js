class Enemy extends Entity {
    // width = 3;
    // height = 3;

    constructor(position) {
        super(position);

        this.width = 3;
        this.height = 3;

        this.velocity = vec2(0,0);
        this.size = vec2(this.width, this.height);
        this.color = new Color(1,1,.2);
    }

    draw() {
        drawRect(this.position, this.size, this.color, 0, 0);
    }

    handleCollision(collision) {
        let myBounds = this.getBoundingBox();
        let bounds = collision.entity.getBoundingBox();

        let amountInTop = myBounds.top - bounds.top;
        let amountInBottom = bounds.bottom -  myBounds.bottom;
        let amountInLeft =  bounds.left - myBounds.left;
        let amountInRight = myBounds.right - bounds.right;

        // console.log(`${amountInBottom} and ${amountInLeft}`)

        // bounce off bottom
        if(myBounds.bottom < bounds.top && myBounds.bottom > bounds.bottom) {
            if(amountInBottom < amountInLeft && amountInBottom < amountInRight) {
                this.position.y = bounds.top + Math.ceil(this.height / 2);
            }
        }

        // bounce off top
        if(myBounds.top > bounds.bottom && myBounds.top < bounds.top) {
            if(amountInTop < amountInLeft && amountInTop < amountInRight) {
                this.position.y = bounds.bottom - Math.ceil(this.height / 2);
            }
        }
        
        // bounce off left
        if(myBounds.left < bounds.right && myBounds.left > bounds.left) {
            if(amountInLeft < amountInBottom && amountInLeft < amountInTop) {
                this.position.x = bounds.right + Math.ceil(this.width / 2);
            }
        }

        // bounce off right
        if(myBounds.right > bounds.left && myBounds.right < bounds.right) {
            if(amountInRight < amountInBottom && amountInRight < amountInTop) {
                this.position.x = bounds.left - Math.ceil(this.width / 2);
            }
        }
    }

    getBoundingBox() {
        return {
            left: this.position.x - this.width/2,
            right: this.position.x + this.width/2,
            top: this.position.y + this.height/2,
            bottom: this.position.y - this.height/2,
        }
    }

    update(context) {
        this.velocity = context.ship.position.subtract(this.position).scale(.01);
        this.move(this.position.copy().add(this.velocity), context);
    }
}