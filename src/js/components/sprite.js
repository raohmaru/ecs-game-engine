import Renderable from './renderable.js';
import Transform from '../lib/geom/transform.js';
import Point from '../lib/geom/point.js';

export default class Sprite extends Renderable {
	constructor(view, width = 0, height = 0) {
		const w = width || view.width;
		const h = height || view.height;
		super(view, w, h);
		
		this.transformation = new Transform();
		this.transformation.change.then(this.updateBox.bind(this));
		this.scaleFactor = new Point(1, 1);
	}
	
	updateBox() {
		this.box.width  = this.drawBox.width  * Math.abs(this.transformation.scaleX);
		this.box.height = this.drawBox.height * Math.abs(this.transformation.scaleY);
		this.scaleFactor.x = this.drawBox.width / this.box.width;
		this.scaleFactor.y = this.drawBox.height / this.box.height;
	}
};
