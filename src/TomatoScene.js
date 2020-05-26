import {Scene, Pointer, World, Body} from 'verf';

import {Tomato} from './Tomato.js';

export class TomatoScene extends Scene {

    init() {

        let world = this.addWorld(new World({gravityY: this.viewport.height}));

        this.currentTomato = this.addTomato();

        let pointer = this.addControls(new Pointer());
        pointer.on('pointerdown', (e) => {
            if (e.worldX < this.currentTomato.body.left) {
                return;
            }
            if (e.worldX > this.currentTomato.body.right) {
                return;
            }
            if (e.worldY < this.currentTomato.body.top) {
                return;
            }
            if (e.worldY > this.currentTomato.body.bottom) {
                return;
            }
            this.currentTomato.body.allowGravity = false;
            this.currentTomato.body.vx = 0;
            this.currentTomato.body.vy = 0;
            this.currentTomato.frame = 1 + Math.floor(Math.random() * 7);
            this.sfx.playRandom('splat');

            this.currentTomato = this.addTomato();
        });
    }

    addTomato()
    {
        let tomato = this.add(new Tomato({
            x: this.camera.x - this.viewport.width / 4 + Math.random() * this.viewport.width / 2,
            y: this.camera.y + this.viewport.height / 2 + 16
        }));
        tomato.addBody(new Body());
        tomato.body.vy = -this.viewport.height + 160 - Math.random() * 320;
        tomato.body.vx = -this.viewport.width / 8;
        return tomato;
    }

    update(time, delta)
    {
        if (this.currentTomato.body.top > this.camera.y + this.viewport.height / 2) {
            this.currentTomato.body.x = this.camera.x - this.viewport.width / 4 + Math.random() * this.viewport.width / 2;
            this.currentTomato.body.vy = -this.viewport.height + 160 - Math.random() * 320;
            this.currentTomato.body.vx = -this.viewport.width / 8 + Math.random() * this.viewport.width / 4;
        }
    }
}
