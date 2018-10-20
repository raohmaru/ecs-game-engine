import Renderable from './renderable.js';

export default class Sprite extends Renderable {
	constructor(view) {
		super(view, view.width, view.height);
	}
};
