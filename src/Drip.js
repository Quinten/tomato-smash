import {GameObject} from 'verf';

export class Drip extends GameObject {
    constructor(config)
    {
        super(config);
        this.fillStyle = 'tomato';
        this.width = 1 + Math.floor(Math.random() * 3);
        this.height = 2 + Math.floor(Math.random() * 3);
        this.lifespan = 1000 + Math.random() * 3000;
    }

    addBody(body)
    {
        super.addBody(body);
        this.body.allowGravity = false;
        this.body.vy = Math.random() * 40;
        return this.body;
    }

    render(context, offset)
    {
        super.render(this.scene.paintCanvas.context, offset);
    }
}
