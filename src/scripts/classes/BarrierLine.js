import Barrier from "./Barrier";
export default class BarrierLine {

    constructor(startX, startY, numBarriers, barrierSize, direction) {
        this.barriers = [];
        this.direction = direction;

        for(let i = 0; i < numBarriers; i++) {
            let p;
            switch(direction) {
                case "horizontal":
                    p = Barrier.create(startX + 2 * barrierSize * i, startY, 0, 0, 0, barrierSize);
                break;
                case "vertical":
                    p = Barrier.create(startX, startY  + 2 * barrierSize * i, 0, 0, 0, barrierSize);
                break;
                case "diagonal_decreasing":
                    p = Barrier.create(startX + 2 * barrierSize * i, startY  - 2 * barrierSize * i, 0, 0, 0, barrierSize);
                break;

                case"diagonal_increasing":
                    p = Barrier.create(startX + 2 * barrierSize * i, startY  + 2 * barrierSize * i, 0, 0, 0, barrierSize);
                break;
            }
            this.barriers.push(p);
        }
        let strain = 0.0005;
        for(let i = 0; i < numBarriers; i++) {
            let p = this.barriers[i];
            if(i > 0) {
                p.addSpring(this.barriers[i - 1], strain, 4);
            }
            if(i < numBarriers - 1) {
                p.addSpring(this.barriers[i + 1], strain, 4);
                p.nextBarrier = this.barriers[i + 1];
            }
            //console.log(p.x, p.y);
            p.addSpring({
                x: p.x,
                y: p.y + 2,
            }, strain, 4);
            p.addSpring({
                x: p.x,
                y: p.y - 2,
            }, strain, 4);
            p.addSpring({
                x: p.x + 2,
                y: p.y,
            }, strain, 4);
            p.addSpring({
                x: p.x - 2,
                y: p.y,
            }, strain, 4);
        }
        this.barriers[this.barriers.length - 1].nextBarrier = this.barriers[0];
        this.barriers[this.barriers.length - 1].setActiveDark();
        this.barriers[Math.floor(this.barriers.length / 2)].setActiveDark();
    }

    draw(ctx) {
        this.barriers.map((b) => {
            b.update();
            b.draw(ctx);
        });
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        for(let i = 0; i < this.barriers.length; i++) {
            ctx.beginPath();
            ctx.moveTo(this.barriers[0].x, this.barriers[0].y);
            for(let k = 1; k < this.barriers.length; k++) {
                ctx.lineTo(this.barriers[k].x, this.barriers[k].y);
            }
            ctx.stroke();
            ctx.closePath();
        }
    }
}