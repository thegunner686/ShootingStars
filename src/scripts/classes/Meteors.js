function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export default class Meteor {
    constructor(x, y, radius, mass) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = mass;
    }

    collided(x, y, radius) {
        if(distance(x, y, this.x, this.y) < radius + this.radius) {
            return true;
        }
        return false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(30, 240, 230, 0.9)";
        ctx.moveTo(this.x, this.y);
        ctx.fillStyle = "rgba(30, 240, " + (200 + Math.floor(Math.random() * 55)) + ", 0.7)";
        for(let k = 0; k < Math.floor(Math.random() * 3 + 1); k++) {
            ctx.lineTo(this.x + (Math.random() < 0.5 ? -this.radius / 2 : this.radius / 2) + Math.random() * this.radius - this.radius / 2,
                    this.y+ (Math.random() < 0.5 ? -this.radius / 2 : this.radius / 2) + Math.random() * this.radius - this.radius / 2);
            ctx.stroke();
            ctx.fill();
        }
        ctx.closePath();
    }
}