import Rectangle from '../lib/geom/rectangle.js';

export default class Renderable {
	constructor(view, width, height, x = 0, y = 0) {
		this.view = view;
		this.box = new Rectangle(width, height, x, y);
	}
	
	get x() {
		return this.box.x;
	}
	
	get y() {
		return this.box.y;
	}
	
	get width() {
		return this.box.width;
	}
	
	get height() {
		return this.box.height;
	}
	
	set x(value) {
		this.box.x = value;
	}
	
	set y(value) {
		this.box.y = value;
	}
};
