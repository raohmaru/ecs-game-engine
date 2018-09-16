import CONST from '../core/const.js';

export default class Canvas2DRenderer {
	constructor(canvas, {width = 0, height = 0, scaleFactor = {x:1, y:1}, stageColor, antialias = false}) {
		this._canvas = canvas;
		if(this._canvas.getContext) {
			this._ctx = this._canvas.getContext('2d');
		} else {
			throw new Error('Your browser does not support CanvasRenderingContext2D');
		}		
		
		this._scaleFactor = scaleFactor;
		this._stageColor = stageColor;
		
		if(width || height) {
			this.resize(width, height);
		}
		
		this.setAntialias(antialias);
	}
	
	get canvas() {
		return this._canvas;
	}
	
	resize(width, height) {
		this._canvas.width = width / this._scaleFactor.x | 0;
		this._canvas.height = height / this._scaleFactor.y | 0;
		
		this._canvas.style.width = `${width}px`;
		this._canvas.style.height = `${height}px`;
	}
	
	prepare() {
		if(this._stageColor) {		
			this._ctx.fillStyle = this._stageColor;
			this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
		} else {
			this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		}
	}
		
	drawBG(bg) {
		this._ctx.fillStyle = bg.fillStyle;
		
		if(bg.dx || bg.dy) {
			this._ctx.translate(bg.dx, bg.dy);
			this._ctx.fillRect(bg.x-bg.dx, bg.y-bg.dy, bg.width, bg.height);
			this.resetTransformation();
		} else {
			this._ctx.fillRect(bg.x, bg.y, bg.width, bg.height);
		}
	}
	
	drawSprite(sprite) {
		// https://jsperf.com/canvas-drawimage-vs-putimagedata/3
		this._ctx.drawImage(sprite.view, sprite.x, sprite.y);
		// this._ctx.putImageData(sprite.view, sprite.x, sprite.y);
	}
	
	setAntialias(antialias) {
		this._antialias = antialias;
		this._ctx.imageSmoothingEnabled = antialias;
		
		if(antialias) {
			this._canvas.classList.add(CONST.CL_PIXELATED);
		} else {
			this._canvas.classList.remove(CONST.CL_PIXELATED);
		}
	}
	
	resetTransformation() {
		this._ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
};
