class Ship {
    constructor() {
        this.position = vec2(5,5);
        this.velocity = vec2(0,0);
        this.size = vec2(3,3);
        this.color = new Color(.2,1,1);
    }

    draw() {
        drawRect(this.position, this.size, this.color, 0, 0);
    }

    update(context) {
        this.velocity = context.gameStick;
        this.position = this.position.add(this.velocity);
    }
}