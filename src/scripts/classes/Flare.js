function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export default class Flare {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.radius = size;

        this.draw = this.draw.bind(this);
    }

    collided(x, y, radius) {
        if(distance(x, y, this.x, this.y) < radius + this.radius - 20) {
            return true;
        }
        return false;
    }

    draw(ctx) {
        for(let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
            ctx.fillStyle = "rgba(" + Math.floor(Math.random() * 100 + 155) + ", " + 
                            (Math.floor(Math.random() * 50) + 50) + ", 60, 0.8)";
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            for(let k = 0; k < 5; k++) {
                ctx.lineTo(Math.random() * this.size * 1.8 - this.size * 0.9 + this.x, Math.random() * this.size * 1.8 - this.size * 0.9 + this.y);
            }
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = "rgba(250, 250, " + Math.floor(Math.random() * 100 + 150) + ", 0.5)";
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            for(let k = 0; k < 3; k++) {
                ctx.lineTo(Math.random() * this.size * 1.5 - this.size * 0.75 + this.x, Math.random() * this.size * 1.5 - this.size * 0.75 + this.y);
            }
            ctx.fill();
            ctx.closePath();
        }
    }
}