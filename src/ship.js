class Ship {
    constructor() {
        this.position = vec2(10,10);
        this.size = vec2(3,3);
        this.color = new Color(.2,1,.2);
    }

    draw() {
        drawRect(this.position, this.size, this.color, 0, 0);
    }

    update(context) {
    }
}