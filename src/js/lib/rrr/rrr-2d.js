import CONST from '../core/const.js';
import Rectangle from '../geom/rectangle.js';

// Cached rectangle object to avoid creation of new rectangles each frame
const intersect = new Rectangle();

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
		
	drawBG(bg, viewport) {
		Rectangle.intersect(bg.box, viewport, intersect);
		let isStatic = bg.parallax || bg.fixed;
		
		if(intersect.area || isStatic) {
			this._ctx.fillStyle = bg.fillStyle;
			
			let dx = 0;
			let dy = 0;
			const translate = (bg.dx || bg.dy || (typeof bg.view !== 'string' && bg.parallax));
			
			if(translate) {
				dx = (bg.dx || 0) - viewport.x;
				dy = (bg.dy || 0) - viewport.y;
				this._ctx.translate(dx, dy);
			}
			
			const x      = (isStatic ? bg.x      : intersect.x - viewport.x) - dx;
			const y      = (isStatic ? bg.y      : intersect.y - viewport.y) - dy;
			const width  =  isStatic ? bg.width  : intersect.width;
			const height =  isStatic ? bg.height : intersect.height;
			
			this._ctx.fillRect(x, y, width, height);
				
			if(translate) {
				this._ctx.translate(-dx, -dy);
			}
		}
	}
	
	drawSprite(sprite, viewport) {
		Rectangle.intersect(sprite.box, viewport, intersect);
		if(intersect.area) {
			// https://jsperf.com/canvas-drawimage-vs-putimagedata/3
			this._ctx.drawImage(
				sprite.view,               // image
				0,                         // sx
				0,                         // sy
				intersect.width,           // sWidth
				intersect.height,          // sHeight
				intersect.x - viewport.x,  // dx
				intersect.y - viewport.y,  // dy
				intersect.width,           // dWidth
				intersect.height           // dHeight
			);
		}
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
	
	resetTransformations() {
		// this._ctx.resetTransform();  // Not yet available
		this._ctx.setTransform(...CONST.IDENTITY_MATRIX);
	}
};
