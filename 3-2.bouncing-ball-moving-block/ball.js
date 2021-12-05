
export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;
        this.drawBall = true;

        this.x = this.radius + (Math.random()*(stageWidth-this.radius*2));
        this.y = this.radius + (Math.random()*(stageHeight-this.radius*2));
    }

    draw(ctx, stageWidth, stageheight, block) {
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageheight);
        this.bounceBlock(block);

        ctx.fillStyle = '#fdd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius;
        const minY = this.radius;
        const maxX = stageWidth - this.radius;
        const maxY = stageHeight - this.radius;

        if(this.x <= minX || this.x >= maxX) {
            this.vx *= -1;
            this.x += this.vx;
        }
        if(this.y <= minY || this.y >= maxY) {
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        if (this.x >= minX && this.x <= maxX && this.y >= minY && this.y <= maxY) {
            const diffX1 = Math.abs(this.x - minX);
            const diffX2 = Math.abs(this.x - maxX);
            const diffY1 = Math.abs(this.y - minY);
            const diffY2 = Math.abs(this.y - maxY);

            const min1 = Math.min(diffX1, diffX2);
            const min2 = Math.min(diffY1, diffY2);
            if(min1<=min2) {
                this.vx *= -1;
                this.x += this.vx;
            } else {
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }
}