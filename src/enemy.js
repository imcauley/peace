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