import {GameObject} from 'verf';

export class PaintCanvas extends GameObject {
    constructor()
    {
        super();
        this.canvas = document.createElement('canvas');
        this.canvas.style.imageRendering = 'pixelated';
        this.context = this.canvas.getContext('2d');
    }

    draw (context)
    {
        context.drawImage(this.canvas, 0, 0);
    }

    resize(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.canvas.width = w;
        this.canvas.height = h;
    }
}
