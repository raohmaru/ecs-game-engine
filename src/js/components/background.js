export default class Background {
	constructor(view, width, height, x = 0, y = 0) {
		this.fillStyle = view;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
	}
};
