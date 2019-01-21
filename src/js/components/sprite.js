import Renderable from './renderable.js';

export default class Sprite extends Renderable {
	constructor(view, width = 0, height = 0) {
		const w = width || view.width;
		const h = height || view.height;
		super(view, w, h);
	}
};
