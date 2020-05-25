import {Scene} from 'verf';

import {Tomato} from './Tomato.js';

export class TomatoScene extends Scene {

    init() {
        this.add(new Tomato({
            x: this.viewport.width / 2,
            y: this.viewport.height / 2
        }));
    }
}
