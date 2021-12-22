class Enemy {
    constructor() {
        this.position = vec2(0,0);
        this.velocity = vec2(0,0);
        this.size = vec2(3,3);
        this.color = new Color(1,1,.2);
    }

    draw() {
        drawRect(this.position, this.size, this.color, 0, 0);
    }

    update(context) {
        this.velocity = context.ship.position.subtract(this.position).scale(.01);
        this.position = this.position.add(this.velocity);
        // console.log(this.velocity)
    }
}