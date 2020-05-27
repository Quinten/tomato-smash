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

    render(context, offset)
    {
        if (this.lifespan) {
            super.render(this.scene.paintCanvas.context, offset);
        } else {
            super.render(context, offset);
        }
    }
}
