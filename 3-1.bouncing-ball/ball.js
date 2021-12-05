export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        // const diameter = this.radius * 2;
        this.x = this.radius + (Math.random()*(stageWidth-this.radius));
        this.y = this.radius + (Math.random()*(stageHeight-this.radius));
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
        const minX = block.x-this.radius;
        const maxX = block.maxX+this.radius;
        const minY = block.y-this.radius;
        const maxY = block.maxY+this.radius;

        //문제점 : 시작점이 if 조건문을 만족하면 블럭 안에서 빠져나올수가 없음
        if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            const x1 = Math.abs(minX-this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY-this.y);
            const y2 = Math.abs(this.y - maxY);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if(min === min1) {
                this.vx *= -1;
                this.x += this.vx;
            } else if (min === min2) {
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }
}