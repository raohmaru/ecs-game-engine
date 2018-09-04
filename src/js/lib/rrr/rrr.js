import CONST from './rrr-const.js';
import CanvasRenderer from './rrr-2d.js';

	
const createRenderer = (type, view) => {
	if(type === CONST.CANVAS) {
		return new CanvasRenderer(view);
	}
}

class Rrr {
	constructor(view, rendererType = 0, bgcolor) {
		this.view = view;
		this.bgcolor = bgcolor;
		this.renderer = createRenderer(rendererType, view);
		this.sprites = new WeakSet();
		this.layers = [];
	}
	
	get world() {
		return this.view;
	}
	
	addSprite(sprite, layer = 0) {
		sprite.layer = layer;
		this.sprites.add(sprite)
		if(!this.layers[layer]) {
			this.layers[layer] = new Set();
		}
		this.layers[layer].add(sprite);
	}

	render() {
		this.renderer.prepare(this.bgcolor);
		
		this.layers.forEach( (layer) => {
			for (let sprite of layer) {
				this.renderer.drawSprite(sprite);
			}
		});
	}
};

Object.assign(Rrr, CONST);

export default Rrr;
