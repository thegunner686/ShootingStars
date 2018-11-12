export default class Player2Endgame {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.radius = size;
        this.size = size * 2;
        this.width = size;
        this.height = size;
        this.numSides = 4;
    }

    draw(ctx) {
        // green
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.moveTo(this.x, this.y);
        ctx.fillStyle = "rgba(" + (50 + Math.floor(Math.random() * 200)) + ", 10, 200, 0.5)";
        for(let k = 0; k < Math.floor(Math.random() * 3 + 1); k++) {
            
            ctx.lineTo(this.x + (Math.random() < 0.5 ? -this.width / 2 : this.width / 2) + Math.random() * this.size - this.size/2,
                    this.y+ (Math.random() < 0.5 ? -this.height / 2 : this.height / 2) + Math.random() * this.size - this.size/2);
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
        ctx.fillStyle = "rgba(128, 10, 128, 0.1)";
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

        ctx.strokeStyle = "white";
        ctx.font = "100px serif";
        ctx.strokeText("WINNER", this.x - 190, this.y - 200);
    }
}