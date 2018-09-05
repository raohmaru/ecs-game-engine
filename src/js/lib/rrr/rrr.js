import CONST from './rrr-const.js';
import CanvasRenderer from './rrr-2d.js';

	
const createRenderer = (type, canvas) => {
	if(type === CONST.CANVAS) {
		return new CanvasRenderer(canvas);
	}
}

class Rrr {
	constructor(canvas, rendererType, canvasColor) {
		this.canvas = canvas;
		this.canvasColor = canvasColor;
		this.renderer = createRenderer(rendererType, canvas);
		this.sprites = new WeakSet();
		this.layers = [];
	}
	
	get view() {
		return this.canvas;
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
		this.renderer.prepare(this.canvasColor);
		
		this.layers.forEach( (layer) => {
			for (let sprite of layer) {
				this.renderer.drawSprite(sprite);
			}
		});
	}
};

Object.assign(Rrr, CONST);

export default Rrr;
