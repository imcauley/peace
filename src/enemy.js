class Enemy extends Entity {
    static get WIDTH() {return 3};
    static get HEIGHT() {return 3};

    constructor(position) {
        super(position);
        this.velocity = vec2(0,0);
        this.size = vec2(Enemy.WIDTH,Enemy.HEIGHT);
        this.color = new Color(1,1,.2);
    }

    draw() {
        drawRect(this.position, this.size, this.color, 0, 0);
    }

    update(context) {
        this.velocity = context.ship.position.subtract(this.position).scale(.01);
        this.position = this.position.add(this.velocity);
    }

    getBoundingBox() {
        return {
            width: vec2(this.position.x - Enemy.WIDTH/2, this.position.x + Enemy.WIDTH/2),
            height: vec2(this.position.y - Enemy.HEIGHT/2, this.position.y + Enemy.HEIGHT/2),
        }
    }
}