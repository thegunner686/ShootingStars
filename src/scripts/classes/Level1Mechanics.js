import Player from "./Player";
import Barrier from "./Barrier";
import BarrierLine from "./BarrierLine";
import Flare from "./Flare";
import Player2 from "./Player2";
import Player1 from "./Player1";
import Meteor from "./Meteors";
import EndgameAnimation from "./EndgameAnimation";
import Player2Endgame from "./Player2Endgame";
import Player1Endgame from "./Player1Endgame";
import Firework from "./Firework";

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export default class Level1Mechanics {
    constructor() {
        this.init = this.init.bind(this);
        this.player1 = null;
        this.player2 = null;
        this.flare = null;
        this.barrierLines = [];
        this.meteors = [];
        this.playing = true;
        this.draw = this.draw.bind(this);
        this.endGame = this.endGame.bind(this);
        this.winner = null;
        this.animationElement = null;

        this.fireworks = [];
    }

    init(width, height) {
        this.player1 = new Player1(100, height / 2);
        this.player2 = new Player2(width - 100, height / 2);
        this.flare = new Flare(width / 2, height / 2, 80);
        this.width = width;
        this.height = height;
        let mag = 8;
        let padding = 50;
        this.barrierLines.push(new BarrierLine(-padding, height - padding, (Math.floor(width / mag)), mag, "horizontal"));
        this.barrierLines.push(new BarrierLine(padding, -padding, (Math.floor(height / mag)), mag, "vertical"));
        this.barrierLines.push(new BarrierLine(width - padding, -padding, (Math.floor(height / mag)), mag, "vertical"));
        this.barrierLines.push(new BarrierLine(-padding, padding, (Math.floor(width / mag)), mag, "horizontal"));

        for(let i = 0; i < 15; i++) {
            let mx = padding + Math.random() * (width - padding * 2),
                my = padding + Math.random() * (height - padding * 2),
                size = 5;
            while(this.flare.collided(mx, my, size + 20)) {
                mx = padding + Math.random() * (width - padding * 2);
                my = padding + Math.random() * (height - padding * 2);
            }
            this.meteors.push(new Meteor(mx, my, size));
        }

        setInterval(() => {
            for(let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
                let mx = padding + Math.random() * (width - padding * 2),
                    my = padding + Math.random() * (height - padding * 2),
                size = 5;
                while(this.flare.collided(mx, my, size + 20)) {
                    mx = padding + Math.random() * (width - padding * 2);
                    my = padding + Math.random() * (height - padding * 2);
                }
                this.meteors.push(new Meteor(mx, my, size));
            }
        }, 1500 + Math.floor(Math.random() * 400));
    }

    update() {
        this.player1.gravitateTo(this.player2);
        this.player2.gravitateTo(this.player1);
        
        let beforeX1 = this.player1.x,
            beforeY1 = this.player1.y;
        this.player1.update();

        let beforeX2 = this.player2.x,
            beforeY2 = this.player2.y;
        this.player2.update();

        let passiveMass = 0;

        this.barrierLines.map((line) => {
            for(let i = 0; i < line.barriers.length; i++) {
                let dist1 = distance(line.barriers[i].x, line.barriers[i].y, this.player1.x, this.player1.y),
                    dist2 = distance(line.barriers[i].x, line.barriers[i].y, this.player2.x, this.player2.y);
                //console.log(dist1);
                if(dist1 < dist2) {
                    line.barriers[i].setColor(this.player1.getColorWithOpacity(1-dist1/this.height*2));
                    passiveMass++; // player 1 is positive
                } else {
                    line.barriers[i].setColor(this.player2.getColorWithOpacity(1-dist2/this.height*2));
                    passiveMass--; // player 2 is negative
                }
                let bounceback = 0.6,
                    immediate = 0;

                if(line.barriers[i].collided(this.player1.x, this.player1.y, this.player1.width)) {
                    let velocY = this.player1.vy,
                        velocX = this.player1.vx;
                    //this.fireworks.push(new Firework(line.barriers[i].x, line.barriers[i].y));
                    if(line.direction == "horizontal") {
                        this.player1.y = beforeY1;
                        this.player1.vy *= -bounceback;
                        line.barriers[i].vy = velocY * 0.02;
                        if(line.barriers[i].x > this.player1.x) {
                            this.player1.x -= immediate;
                        } else {
                            this.player1.x += immediate;
                        }
                    } else {
                        this.player1.x = beforeX1;
                        this.player1.vx *= -bounceback;
                        line.barriers[i].vx = velocX * 0.02;
                        if(line.barriers[i].y > this.player1.y) {
                            this.player1.y -= immediate;
                        } else {
                            this.player1.y += immediate;
                        }
                    }
                }

                if(line.barriers[i].collided(this.player2.x, this.player2.y, this.player2.width)) {
                    let velocY = this.player2.vy,
                        velocX = this.player2.vx;
                    //this.fireworks.push(new Firework(line.barriers[i].x, line.barriers[i].y));
                    if(line.direction == "horizontal") {
                        this.player2.y = beforeY2;
                        this.player2.vy *= -bounceback;
                        line.barriers[i].vy = velocY * 0.1;
                        if(line.barriers[i].x > this.player2.x) {
                            this.player2.x -= immediate;
                        } else {
                            this.player2.x += immediate;
                        }
                    } else {
                        this.player2.x = beforeX2;
                        this.player2.vx *= -bounceback;
                        line.barriers[i].vx = velocX * 0.02;
                        if(line.barriers[i].y > this.player2.y) {
                            this.player2.y -= immediate;
                        } else {
                            this.player2.y += immediate;
                        }
                    }
                }
            }

            if(passiveMass > 0) {
                this.player1.mass += 0.1;
            } else if(passiveMass < 0){
                this.player2.mass += 0.1;
            }
        });
    }

    draw(ctx) {
        // background
        if(!this.playing) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
            ctx.fillRect(0, 0, this.width, this.height);
            if(this.animationElement != null) {
                if(this.animationElement.size <= 0) {
                    this.winner.draw(ctx);
                } else {
                    this.animationElement.draw(ctx);
                }
            }
            return;
        }
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, this.width, this.height);
        this.player1.draw(ctx);
        this.player2.draw(ctx);
        this.barrierLines.map((b) => {
            b.draw(ctx);
        });
        this.flare.draw(ctx);
        if(this.flare.collided(this.player1.x, this.player1.y, this.player1.radius)) {
            this.playing = false;
            this.winner = new Player2Endgame(this.width / 2, this.height / 2, 80);
            this.endGame();
        } else if(this.flare.collided(this.player2.x, this.player2.y, this.player2.radius)) {
            this.playing = false;
            this.winner = new Player1Endgame(this.width / 2, this.height / 2, 80);
            this.endGame();
        }
        for(let i = this.meteors.length - 1; i >= 0; i--) {
            this.meteors[i].draw(ctx);
            if(this.meteors[i].collided(this.player1.x, this.player1.y, this.player1.radius)) {
                this.player1.mass += 70;    
                this.meteors.splice(i, 1);
            } else if(this.meteors[i].collided(this.player2.x, this.player2.y, this.player2.radius)) {
                this.player2.mass += 70;
                this.meteors.splice(i, 1);
            }
        }
        // fireworks
        for(let i = this.fireworks.length - 1; i >0; i--) {
            this.fireworks[i].draw(ctx);
            if(this.fireworks[i].particles.length == 0) {
                this.fireworks.splice(i, 1);
            }
        }
    }

    endGame() {
        this.animationElement = new EndgameAnimation(this.width / 2, this.height / 2, 80);
    }
}