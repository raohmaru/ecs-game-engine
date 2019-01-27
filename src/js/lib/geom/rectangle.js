export default class Rectangle {
	constructor(width, height, x = 0, y = 0) {
		this.width  = width;
		this.height = height;
		this.x      = x;
		this.y      = y;
	}
	
	get top() {
		return this.y;
	}
	
	get right() {
		return this.x + this.width;
	}
	
	get bottom() {
		return this.y + this.height;
	}	
	
	get left() {
		return this.y;
	}
	
	get area() {
		const a = this.width * this.height;
		return a > 0 ? a : 0;
	}
	
	clone() {
		return new Rectangle(this.width, this.height, this.x, this.y);
	}
}

Rectangle.intersect = (rect1, rect2, rect) => {
	const x      = rect1.x > rect2.x ? rect1.x : rect2.x;
	const y      = rect1.y > rect2.y ? rect1.y : rect2.y;
	const width  = rect1.right > rect2.right ? rect2.right - x : rect1.right - x;
	const height = rect1.bottom > rect2.bottom ? rect2.bottom - y : rect1.bottom - y;
	
	if(!rect) {
		rect = new Rectangle(width, height, x, y);
	} else {
		rect.width  = width;
		rect.height = height;
		rect.x      = x;
		rect.y      = y;
	}
	
	return rect;
}
