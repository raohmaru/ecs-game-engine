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
		super(view, width, height, x, y);
		if(typeof view === 'string' || view instanceof CanvasGradient) {
			this.fillStyle = view;
		} else {
			this.fillStyle = createPattern(view, repetition);
			this.repetition = repetition;
		}		
		this.parallax = parallax;
		this.fixed = fixed;
		this.isBackground = true;
	}
};
