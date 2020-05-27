import {GameObject} from 'verf';

export class Particle extends GameObject {
    constructor(config)
    {
        super(config);
        this.fillStyle = 'tomato';
        this.width = 2 + Math.floor(Math.random() * 3);
        this.height = 2 + Math.floor(Math.random() * 3);
        this.lifespan = 2000;
    }

    addBody(body)
    {
        super.addBody(body);
        this.body.allowGravity = true;
        this.body.vx = -120 + Math.random() * 240;
        this.body.vy = -60 + Math.random() * 120;
        return this.body;
    }
}
