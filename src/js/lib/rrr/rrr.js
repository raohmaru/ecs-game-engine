import CONST from './rrr-const.js';
import Canvas2DRenderer from './rrr-2d.js';
	
const createRenderer = (type, canvas, cfg) => {
	if(type === CONST.CANVAS) {
		return new Canvas2DRenderer(canvas, cfg);
	}
}

class Rrr {
	constructor(canvas, rendererType = CONST.CANVAS, cfg) {
		this._renderer = createRenderer(rendererType, canvas, cfg);
		this._sprites = new WeakSet();
		this._layers = [];
	}
	
	get stage() {
		return this._renderer.canvas;
	}
	
	addSprite(sprite, layer = 0) {
		sprite.layer = layer;
		this._sprites.add(sprite)
		if(!this._layers[layer]) {
			this._layers[layer] = new Set();
		}
		this._layers[layer].add(sprite);
	}

	render() {
		this._renderer.prepare();
		
		this._layers.forEach( (layer) => {
			for (let sprite of layer) {
				if(sprite.fillStyle) {
					this._renderer.drawBG(sprite);
				} else {
					this._renderer.drawSprite(sprite);
				}
			}
		});
	}
};

Object.assign(Rrr, CONST);

export default Rrr;
