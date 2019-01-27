import Rectangle from '../lib/geom/rectangle.js';

export default class Renderable {
	constructor(viewOrPath, width, height, x = 0, y = 0) {
		if(typeof viewOrPath === 'string') {
			this.path = viewOrPath;
		} else {
			this.view = viewOrPath;
		}
		this.box = new Rectangle(width, height, x, y); // Rendered bounding box 
		this.drawBox = new Rectangle(width, height, x, y); // Intrinsic bounding box
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
	
	updateView(view) {
		this.view = view;
	}
};
