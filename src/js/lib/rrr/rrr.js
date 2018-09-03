import CONST from './rrr-const.js';
import CanvasRenderer from './rrr-2d.js';

class Rrr {
	constructor(view, rendererType = 0, bgcolor) {
		this.view = view;
		this.bgcolor = bgcolor;
		this.createRenderer(rendererType);
		this.sprites = new WeakSet();
		this.layers = [];
	}
	
	createRenderer(type) {
		if(type === CONST.CANVAS) {
			this.renderer = new CanvasRenderer(this.view);
		}
	}
	
	addSprite(sprite, layer) {
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
