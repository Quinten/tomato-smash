import {VerfGame} from 'verf';

import {TomatoScene} from './TomatoScene.js';

export class Game extends VerfGame {
    constructor () {
        super({
            width: 320,
            height: 320,
            overlay: true,
            scenes: [{name: 'tomatoscene', class: TomatoScene}]
        });
    }
};
