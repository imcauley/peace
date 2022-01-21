class Hitbox {
    constructor(points, center) {
        this.points = points;
        this.center = center;
        this.generateEdges();
    }

    generateEdges() {
        this.edges = [];
        for(let i = 0; i < this.points.length - 1; i++) {
            this.edges.push(this.generateEdgeFromPoints(
                this.points[i],
                this.point[i+1]
            ))
        }
        this.edges.push(this.generateEdgeFromPoints(
            this.points[0],
            this.point[this.points.length - 1]
        ))
    }

    generateEdgeFromPoints(p1, p2) {
        return {
            points: [p1,p2],
            equation: this.generateEquationFromPoints(p1,p2),
            midpoint: this.generateMidpointFromPoints(p1,p2)
        }
    }

    generateEquationFromPoints(p1, p2) {
        let slope = (p1.y - p2.y) / (p1.x - p2.x);
        let intercept = p1.y - (slope * p1.x);

        let centerSide = (slope * this.center.x) + intercept - this.center.y;

        return {
            slope: slope,
            intercept: intercept,
            centerSide: centerSide,
        };
    }

    generateMidpointFromPoints(p1, p2) {
        return p1.add(p2).divide(2);
    }

    pointInHitbox(point) {
        let MAX_VALUE = 100000000;
        let smallestDistance = MAX_VALUE;
        let closestEdge = null;

        for(edge of this.edges) {
            let side = (
                (edge.equation.slope * point.x) 
                + edge.equation.intercept 
                - point.y
            );

            let sameSide = (edge.equation.centerSide * side) > 0;

            if(sameSide) {
                let distanceToEdge = edge.midpoint.distance(point);
                if(smallestDistance > distanceToEdge) {
                    smallestDistance = distanceToEdge;
                    closestEdge = edge;
                }
            }
        }

        return closestEdge;
    }
}