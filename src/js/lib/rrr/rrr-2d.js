export default class CanvasRenderer {
	constructor(view) {
		this.view = view;
		if(this.view.getContext) {
			this.ctx = this.view.getContext('2d');
		} else {
			throw new Error('Your browser does not support CanvasRenderingContext2D');
		}
	}
	
	prepare(color = '#fff') {
		if(color) {		
			this.ctx.fillStyle = color;
			this.ctx.fillRect(0, 0, this.view.width, this.view.height);
		} else {
			this.ctx.clearRect(0, 0, this.view.width, this.view.height);
		}
	}
	
	drawSprite(sprite) {
		// https://jsperf.com/canvas-drawimage-vs-putimagedata/3
		this.ctx.drawImage(sprite.view, sprite.x, sprite.y);
		// this.ctx.putImageData(sprite, sprite.x, sprite.y);
	}
};
