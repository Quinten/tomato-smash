import {GameObject} from 'verf';

export class Tomato extends GameObject {
    constructor(config)
    {
        super(config);
        this.fillStyle = 'tomato';
    }

    addBody(body)
    {
        super.addBody(body);
        this.body.allowGravity = true;
        return this.body;
    }
}
