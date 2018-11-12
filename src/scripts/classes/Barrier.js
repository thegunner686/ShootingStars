function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
/*
export default class Barrier {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.collided = this.collided.bind(this);
    }

    collided(x, y, radius) {
        if(distance(x, y, this.x, this.y) < radius + this.radius) {
            return true;
        }
        return false;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}*/

var Barrier = {
	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	mass: 1,
	radius: 1,
	bounce: 1,
	gravity: 0,
	friction: 1,
	springs: null,
    gravitations: null,
    clr: null,
    activeDark: false,
    nextBarrier: null,
	
	create: function(x, y, speed, direction, grav, radius) {
		var obj = Object.create(this);
			obj.x = x;
			obj.y = y;
			obj.vx = Math.cos(direction) * speed;
            obj.vy = Math.sin(direction) * speed;
            obj.firstX = x;
            obj.firstY = y;
            obj.gravity = grav || 0;
            obj.radius = radius;
			obj.springs = [];
			obj.gravitations = [];
		return obj;
	},
	
	getSpeed: function() {
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	},
	
	setSpeed: function(speed) {
		var heading = this.getHeading();
		this.vx = Math.cos(heading) * speed;
		this.vy = Math.sin(heading) * speed;
	},
	
	getHeading: function () {
		return Math.atan2(this.vy, this.vx);
	},
	
	setHeading: function(heading) {
		var speed = this.getSpeed();
		this.vx = Math.cos(heading) * speed;
		this.vy = Math.sin(heading) * speed;
	},
	
	accelerate: function(ax, ay) {
		this.vx += ax;
		this.vy += ay;
	},
	
	distanceTo: function(p2) {
		return Math.sqrt(Math.pow(p2.x - this.x, 2) + Math.pow(p2.y - this.y, 2));
	},
	
	angleTo: function(p2) {
		return Math.atan2(p2.y - this.y, p2.x - this.x);
	},
	
	addGravitation: function(p) {
		this.removeGravitation(p);
		this.gravitations.push(p);
	},
	
	removeGravitation: function(p) {
		for(var i = this.gravitations.length; i >= 0; i--) {
			if(gravitations[i] === p) {
				gravitations.splice(i, 1);
			}	
		}
	},
	
	handleGravitations: function() {
		for(var i = 0; i < this.gravitations.length; i++) {
			this.gravitateTo({x: this.firstX, y: this.firstY, mass: 100});
		}
	},
	
	addSpring: function(point, k, length) {
		this.springs.push({
			point: point,
			k: k,
			length: length || 0
		});
	},
	
	removeSpring: function(point) {
		for(var i = this.springs.length; i >= 0; i--) {
			if(this.springs[i].point === point) {
				this.springs.splice(i, 1);
			}
		}
	},
	
	handleSprings: function() {
		for(var i = 0; i < this.springs.length; i++) {
			var spring = this.springs[i];
				this.springTo(spring.point, spring.k, spring.length);
		}
	},
	
	gravitateTo: function(p2) {
		var dx = p2.x - this.x,
			dy = p2.y - this.y,
			distSQ = dx * dx + dy * dy,
			dist = Math.sqrt(distSQ),
			force = p2.mass / distSQ,
			//angle = this.angleTo(p2),
			ax = dx / dist * force,
			ay = dy / dist * force;
			
		this.vx += ax;
		this.vy += ay;
	},
	
	springTo: function(point, k, length) {
		var dx = point.x - this.x,
			dy = point.y - this.y,
			distance = Math.sqrt(dx * dx + dy * dy),
			springForce = (distance - length || 0) * k;
			
		this.vx += dx / distance * springForce;
		this.vy += dy / distance * springForce;
	},
	
	update: function() {
		this.handleSprings();
		this.vx *= this.friction;
		this.vy *= this.friction;
		//this.vy += this.gravity;
		this.x += this.vx * 0.99;
		this.y += this.vy * 0.99;
    },

    collided: function(x, y, radius) {
        if(distance(x, y, this.x, this.y) < radius + this.radius + 5) {
            return true;
        }
        return false;
    },

    setActiveDark() {
        this.activeDark = true;
        setTimeout(() => {
            this.activeDark = false;
            this.nextBarrier.setActiveDark();
        }, 20);
    },

    setColor: function(clr) {
        this.clr = clr;
    },
    
    draw: function(ctx) {
        ctx.fillStyle = this.clr == null ? "rgba(255, 255, 255, 0.2)" : this.clr;
        ctx.fillStyle = this.activeDark ? "rgba(0, 0, 0, 0.5)" : ctx.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
};

export default Barrier;