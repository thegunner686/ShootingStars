import { createContext } from "vm";

export default class Player2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.mass = 10;

        this.numSides = 4;

        this.vx = 0;
        this.vy = 0;

        let sz = 12;
        this.width = sz;
        this.height = sz;
        this.radius = sz;

        this.color = "rgba(200, 200, 255, 0.9)";

        this.draw = this.draw.bind(this);
        this.keyHandlerDown = this.keyHandlerDown.bind(this);
        this.keyHandlerUp = this.keyHandlerUp.bind(this);

        this.movement = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        document.body.addEventListener("keydown", (e) => this.keyHandlerDown(e));
        document.body.addEventListener("keyup", (e) => this.keyHandlerUp(e));
    }

    keyHandlerUp(e) {
        let mag = 5;
        switch(e.keyCode) {
            case 38:
                this.movement.up = false; // up
            break;
            case 40:
                this.movement.down = false; // down
            break;
            case 37:
                this.movement.left = false; // left
            break;
            case 39:
                this.movement.right = false; // right
            break;
        }
    }

    keyHandlerDown(e) {
        let mag = 5;
        switch(e.keyCode) {
            case 38:
                if(!this.movement.up) {
                    this.y -= 5;
                }
                this.movement.up = true; // up
                this.movement.down = false;
            break;
            case 40:
                if(!this.movement.down) {
                    this.y += 5;
                }
                this.movement.down = true; // down
                this.movement.up = false;
            break;
            case 37:
                if(!this.movement.left) {
                    this.x -= 5;
                }
                this.movement.left = true; // left
                this.movement.right = false;
            break;
            case 39:
                if(!this.movement.right) {
                    this.x += 5;
                }
                this.movement.right = true; // right
                this.movement.left = false;
            break;
        }
    }

    update() {
        let mag = 0.14;
        if(this.movement.up) {
            this.vy -= mag;
        }

        if(this.movement.down) {
            this.vy += mag;
        }

        if(this.movement.left) {
            this.vx -= mag;;
        }

        if(this.movement.right) {
            this.vx += mag;
        }

        this.vy += 0.05;

        this.x += this.vx * 0.99;
        this.y += this.vy * 0.99;

    }

    gravitateTo(p2) {
		var dx = p2.x - this.x,
			dy = p2.y - this.y,
			distSQ = dx * dx + dy * dy,
			dist = Math.sqrt(distSQ) + 15,
			force = p2.mass / distSQ,
			//angle = this.angleTo(p2),
			ax = dx / dist * force,
			ay = dy / dist * force;
			
		this.vx += ax;
		this.vy += ay;
    }
    
    getColorWithOpacity(op) {
        return "rgba(200, 200, 255, " + op + ")";
    }

    draw(ctx) {
        let wildscale = 40;
        // blue
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.moveTo(this.x, this.y);
        ctx.fillStyle = "rgba(" + (50 + Math.floor(Math.random() * 200)) + ", 10, 200, 0.5)";
        for(let k = 0; k < Math.floor(Math.random() * 3 + 1); k++) {
            
            ctx.lineTo(this.x + (Math.random() < 0.5 ? -this.width / 2 : this.width / 2) + Math.random() * this.mass / wildscale - this.mass / (wildscale * 2),
                    this.y+ (Math.random() < 0.5 ? -this.height / 2 : this.height / 2) + Math.random() * this.mass / wildscale - this.mass / (wildscale * 2));
            ctx.stroke();
            ctx.fill();
        }
        ctx.closePath();
        // circles
        /*
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.x + (Math.random() < 0.5 ? -this.width / 3 : this.width / 3) + Math.random() * 40 - 20,
                this.y+ (Math.random() < 0.5 ? -this.height / 3 : this.height / 3) + Math.random() * 40 - 20,
                Math.random() * 3 + 2,
                Math.PI * 2,
                0);
        ctx.fill();
        
        ctx.closePath();
        */
        
        //ctx.fillStyle = "rgba(255, 255, 255, 1)";
        //ctx.fillRect(this.x-this.width / 2, this.y-this.height / 2, this.width, this.height);

        let turnAngle = Math.PI - (this.numSides - 2) * Math.PI / this.numSides;

        ctx.beginPath();
            ctx.fillStyle = "rgba(128, 10, 128, 0.9)";
            let lastX = this.x + this.width,
                lastY = this.y;
            ctx.moveTo(lastX, lastY);
            for(let i = 0; i < this.numSides + 1; i++) {
                lastX = this.x + Math.cos(turnAngle * i) * this.width;
                lastY = this.y + Math.sin(turnAngle * i) * this.height;
                ctx.lineTo(lastX, lastY);
            }
            ctx.fill();
        ctx.closePath();
    }
}