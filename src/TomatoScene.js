import {Scene, Pointer, World, Body} from 'verf';

import {Tomato} from './Tomato.js';
import {DocumentShaker} from './DocumentShaker.js';
import {Particle} from './Particle.js';
import {PaintCanvas} from './PaintCanvas.js';
import {Drip} from './Drip.js';

export class TomatoScene extends Scene {

    init() {

        this.paintCanvas = this.add(new PaintCanvas());
        this.paintCanvas.resize(this.camera.x - this.viewport.width / 2, this.camera.y - this.viewport.height / 2, this.viewport.width, this.viewport.height);

        this.add(new DocumentShaker());

        let world = this.addWorld(new World({gravityY: this.viewport.height}));

        this.currentTomato = this.addTomato();

        let pointer = this.addControls(new Pointer());
        pointer.on('pointerdown', (e) => {
            if (e.worldX < this.currentTomato.body.left) {
                this.camera.flash({color: 'white'});
                this.sfx.play('blip');
                return;
            }
            if (e.worldX > this.currentTomato.body.right) {
                this.camera.flash({color: 'white'});
                this.sfx.play('blip');
                return;
            }
            if (e.worldY < this.currentTomato.body.top) {
                this.camera.flash({color: 'white'});
                this.sfx.play('blip');
                return;
            }
            if (e.worldY > this.currentTomato.body.bottom) {
                this.camera.flash({color: 'white'});
                this.sfx.play('blip');
                return;
            }
            this.currentTomato.body.allowGravity = false;
            this.currentTomato.body.vx = 0;
            this.currentTomato.body.vy = 0;
            this.currentTomato.frame = 1 + Math.floor(Math.random() * 7);
            this.sfx.playRandom('splat');
            this.camera.flash({color: 'tomato', duration: 250});
            this.camera.shake();
            for (let p = 0; p < 20; p++) {
                this.add(new Particle({x: this.currentTomato.x, y: this.currentTomato.y})).addBody(new Body());
            }
            for (let d = 0; d < 3; d++) {
                this.add(new Drip({x: this.currentTomato.x - 8 + Math.random() * 16, y: this.currentTomato.y})).addBody(new Body());
            }

            this.currentTomato.lifespan = 50;

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

        let toRemove = [];
        this.children.forEach((child) => {
            if (child.lifespan !== undefined) {
                child.lifespan -= delta;
                if (child.lifespan < 0) {
                    toRemove.push(child);
                }
            }
        });
        toRemove.forEach((child) => {
            this.remove(child);
        });
        console.log(this.children.length);
    }

    resize(w, h)
    {
        this.paintCanvas.resize(this.camera.x - w / 2, this.camera.y - h / 2, w, h);
    }
}
