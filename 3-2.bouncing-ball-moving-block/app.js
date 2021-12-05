import { Block } from './block.js';
import { Ball } from './ball.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.rect = this.canvas.getBoundingClientRect();

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        
        this.ball = new Ball(this.stageWidth, this.stageHeight, 40, 10);
        this.block = new Block(400, 30, 150, 250);

        this.isDown = false;
        this.isRect = false;
        this.moveX = 0;
        this.moveY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;

        this.ctx.scale(2, 2);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 1.5;
        this.moveY *= 1.5;

        this.block.animate(this.ctx, this.moveX, this.moveY);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }

    onDown(e){
        this.isDown = true;
        this.moveX = 0;
        this.moveY = 0;
        this.offsetX = e.clientX - this.rect.left;
        this.offsetY = e.clientY - this.rect.top;

        if (this.offsetX >= this.block.x && this.offsetX <= this.block.maxX
            && this.offsetY >= this.block.y && this.offsetY <= this.block.maxY) {
                this.isRect = true;
            }
    }

    onMove(e) {
        if(this.isDown && this.isRect) {
            this.moveX = (e.clientX - this.rect.left) - this.offsetX;
            this.moveY = (e.clientY - this.rect.top) - this.offsetY;
            
            this.offsetX = e.clientX - this.rect.left;
            this.offsetY = e.clientY - this.rect.top;
        }
    }

    onUp(e) {
        this.moveX = 0;
        this.moveY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isRect = false;
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
}