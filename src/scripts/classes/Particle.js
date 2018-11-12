export default class Particle {
    constructor(x, y, speed, direction, grav) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
        this.grav = grav;
        this.dead = false;

        this.size = 1;

        this.vx = Math.cos(direction) * speed;
        this.vy = Math.sin(direction) * speed;

        this.color = "white";
        this.lifespan = 10;
        this.life = 0;
        this.draw = this.draw.bind(this);
    }



    draw(ctx) {
        this.life++;
        this.vy += this.grav;
        this.x += this.vx;
        this.y += this.vy;
        ///console.log(this.life);
        //console.log(this.lifespan);
        if(this.life >= this.lifespan) {
            this.dead = true;
        }
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}