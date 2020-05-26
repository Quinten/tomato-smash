import {Sprite} from 'verf';

export class Tomato extends Sprite {
    constructor(config)
    {
        config.name = 'tomato';
        super(config);
    }

    addBody(body)
    {
        super.addBody(body);
        this.body.allowGravity = true;
        return this.body;
    }
}
