export default class EndgameAnimation {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = 0;
        this.shrinking = false;
    }

    draw(ctx) {
        if(this.shrinking) {
            this.vs -= 1;
        } else {
            this.vs += 0.5;
        }
        this.size += this.vs;
        if(this.size > this.x * 2) {
            this.shrinking = true;
        } else if(this.size <= 0) {
            this.size = 0;
        }
        for(let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
            ctx.fillStyle = "rgba(" + Math.floor(Math.random() * 100 + 155) + ", " + 
                            (Math.floor(Math.random() * 50) + 50) + ", 60, 0.8)";
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            for(let k = 0; k < 4; k++) {
                ctx.lineTo(Math.random() * this.size * 1.8 - this.size * 0.9 + this.x, Math.random() * this.size * 1.8 - this.size * 0.9 + this.y);
            }
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = "rgba(250, 250, " + Math.floor(Math.random() * 100 + 150) + ", 0.5)";
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            for(let k = 0; k < 2; k++) {
                ctx.lineTo(Math.random() * this.size * 1.5 - this.size * 0.75 + this.x, Math.random() * this.size * 1.5 - this.size * 0.75 + this.y);
            }
            ctx.fill();
            ctx.closePath();
        }
    }
}