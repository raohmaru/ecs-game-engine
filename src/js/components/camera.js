import Rectangle from '../lib/geom/rectangle.js';

export default class Camera {
	constructor(game, width = 0, height = 0, x = 0, y = 0) {
		this.viewport = new Rectangle(
			width || game.stage.width,
			height || game.stage.height,
			x,
			y
		);
		
		this._x = 0;
		this._y = 0;
		this.x = (this.viewport.width  >> 1 | 0) + x;
		this.y = (this.viewport.height >> 1 | 0) + y;
	}
	
	get x() {
		return this._x;
	}
	
	get y() {
		return this._y;
	}
	
	set x(value) {
		const diff = value - this._x;
		this._x = value;
		this.viewport.x += diff;
	}
	
	set y(value) {
		const diff = value - this._y;
		this._y = value;
		this.viewport.y += diff;
	}
	
	follow(sprite) {
		this.followSprite = sprite;
	}
};
