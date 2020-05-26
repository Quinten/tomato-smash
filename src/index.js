import {VerfGame, Sound} from 'verf';

import {TomatoScene} from './TomatoScene.js';

import splat from './splat.mp3';
import tomato from './tomato.png';
import blip from './blip.mp3';

export class Game extends VerfGame {
    constructor () {
        super({
            width: 320,
            height: 320,
            overlay: true,
            scenes: [{name: 'tomatoscene', class: TomatoScene}],
            plugins: [
                {name: 'sfx', type: 'global', class: Sound, options: {key: 'tomato-smash-sfx'}}
            ],
            assets:[
                {name: 'blip', type: 'audio', src: blip},
                {name: 'tomato', type: 'image', src: tomato},
                {name: 'splat', type: 'audio', src: splat, chunks: [
                        {"start": 0, "end": 0.95},
                        {"start": 1, "end": 1.95},
                        {"start": 2, "end": 2.95},
                        {"start": 3, "end": 3.95},
                        {"start": 4, "end": 4.95},
                        {"start": 5, "end": 5.95},
                        {"start": 6, "end": 6.95},
                        {"start": 7, "end": 7.95}
                ]}
            ]
        });
    }
};
