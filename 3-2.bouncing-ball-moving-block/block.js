export class Block {
    constructor (width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.maxX = width+x;
        this.maxY = height+y;
    }

    animate(ctx, moveX, moveY) {
        ctx.fillStyle = '#ff384e';
        ctx.beginPath();

        this.x += moveX;
        this.y += moveY;
        this.maxX += moveX;
        this.maxY += moveY;

        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}