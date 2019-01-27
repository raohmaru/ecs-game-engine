import C from '../core/const.js';
import Canvas2DRenderer from './rrr-2d.js';
	
const createRenderer = (type, canvas, cfg) => {
	if(type === C.CANVAS) {
		return new Canvas2DRenderer(canvas, cfg);
	}
}

class Rrr {
	constructor(canvas, rendererType = C.CANVAS, cfg) {
		this._renderer = createRenderer(rendererType, canvas, cfg);
		// Default properties
		this._camera;
	}
	
	get stage() {
		return this._renderer.canvas;
	}
	
	get camera() {
		return this._camera;
	}

	render(scene) {
		this._renderer.prepare();
		const viewport = this._camera.viewport;
		
		scene.layers.forEach( (layer) => {
			for (let obj of layer) {
				if(obj.isBackground) {
					this._renderer.drawBG(obj, viewport);
				} else {
					this._renderer.drawSprite(obj, viewport);
				}
			}
		});
	}
	
	addCamera(camera) {
		this._camera = camera;
	}
};

export default Rrr;
