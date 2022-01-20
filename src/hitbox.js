class Hitbox {
    constructor(points, center) {
        this.points = points;
        this.center = center;
        this.generateEdges();
    }

    generateEdges() {
        this.edges = [];
        for(let i = 0; i < this.points.length - 1; i++) {
            this.edges.push([
                this.points[i],
                this.point[i+1]
            ])
        }
        this.edges.push([
            this.points[0],
            this.point[this.points.length - 1]
        ])
    }

    generateEquations() {
        this.equations = [];
        this.edges.forEach(edge => {
            let slope = (edge[0].y - edge[1].y) / (edge[0].x - edge[1].x);
            let intercept = edge[0].y - (slope * edge[0].x);

            let centerSide = (slope * this.center.x) + intercept - this.center.y;

            this.equations.push({
                slope: slope,
                intercept: intercept,
                centerSide: centerSide
            })
        });
    }

    pointInHitbox(point) {
        for(edge of this.equations) {
            let side = (
                (edge.slope * point.x) 
                + edge.intercept 
                - point.y
            );

            let sameSide = (edge.centerSide * side) > 0;
            
            if(!sameSide) {
                return false;
            }
        }

        return true;
    }
}