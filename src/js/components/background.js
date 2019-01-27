import Renderable from './renderable.js';

const createPattern = (view, repetition) => {
	const ctx = view.getContext('2d');
	return ctx.createPattern(view, repetition);
}

export default class Background extends Renderable {
	constructor({
		view,
		width,
		height,
		x = 0,
		y = 0,
		repetition = 'repeat',
		parallax = false,
		fixed = false
	}) {
		let v = view;
		if(typeof view === 'string' || view instanceof CanvasGradient) {
			v = null;
		}
		super(v, width, height, x, y);
		
		if(v) {
			this.fillStyle = createPattern(view, repetition);
			this.repetition = repetition;
		} else {
			this.fillStyle = view;
		}		
		this.parallax = parallax;
		this.fixed = fixed;
		this.isBackground = true;
	}
};
