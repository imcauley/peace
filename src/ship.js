class Ship extends Entity {
    constructor() {
        super(vec2(5,5))
        // this.position = ;
        this.width = 3;
        this.height = 3;

        this.velocity = vec2(0,0);
        this.size = vec2(3,3);
        this.color = new Color(.2,1,1);
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
        this.velocity = context.gameStick;
        this.move(this.position.copy().add(this.velocity), context);
    }
}