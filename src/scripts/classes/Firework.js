import Particle from "./particle";

export default class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];

        for(let i = 0; i < 10; i++) {
            let vel = Math.random() * 5 + 1,
                dir = Math.PI * 2 * Math.random(),
                p = new Particle(this.x, this.y, vel, dir, 0.2);

            this.particles.push(p);
        }
    }

    draw(ctx) {
        for(let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].draw(ctx);
            if(this.particles[i].dead == true) {
                this.particles.splice(i, 1);
            }
        }
    }
}