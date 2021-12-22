class Bar {
    constructor() {
        this.position = vec2(0,0);
        this.velocity = vec2(0,0);
        this.size = 4;
        this.rotation = 2;
        this.rotationSpeed = 0.01;
        this.color = new Color(1,1,.2);

        this.start, this.end = 0; 
    }

    draw() {
        drawLine(this.start, this.end, 0.3, this.color, 0);
    }

    update(context) {
        this.rotation += this.rotationSpeed;
        this.start = this.position.subtract(vec2(this.size/2), this.size/2).rotate(this.rotation);
        this.end = this.position.add(vec2(this.size/2), this.size/2).rotate(this.rotation);
        // this.velocity = context.ship.position.subtract(this.position).scale(.01);
        // this.position = this.position.add(this.velocity);
    }
}