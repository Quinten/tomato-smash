import {GameObject} from 'verf';

// is invisble but syncs the webpage to the camera shake

export class DocumentShaker extends GameObject {
    render (context, offset)
    {
        document.body.style.margin = (offset.y * this.scene.viewport.zoom) + 'px 0 0 ' + (offset.x * this.scene.viewport.zoom) + 'px';
    }
}
