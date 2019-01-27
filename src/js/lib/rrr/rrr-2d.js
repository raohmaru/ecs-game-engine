import C from '../core/const.js';
import Rectangle from '../geom/rectangle.js';
import Point from '../geom/point.js';

// Cached rectangle object to avoid creation of new rectangles each frame
const intersect = new Rectangle();
const d = new Point();
const s = new Point();
const r = new Point();
const abs = Math.abs;
const min = Math.min;

export default class Canvas2DRenderer {
	constructor(canvas, {
			width = 0,
			height = 0,
			scaleFactor = {
				x:1,
				y:1
			},
			stageColor,
			antialias = false,
			debug = false
		}) {
		this._canvas = canvas;
		if(this._canvas.getContext) {
			this._ctx = this._canvas.getContext('2d');
		} else {
			throw new Error('Your browser does not support CanvasRenderingContext2D');
		}		
		
		this._scaleFactor = scaleFactor;
		this._stageColor = stageColor;
		this._debug = debug;
		
		if(width || height) {
			this.resize(width, height);
		}
		
		this.setAntialias(antialias);
		this._ctx.globalAlpha = 1;
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
		if(sprite.view) {
			const spBox = sprite.box;
			Rectangle.intersect(spBox, viewport, intersect);
			if(intersect.area) {
				d.x = intersect.x - viewport.x;
				d.y = intersect.y - viewport.y;
				s.x = (intersect.x - spBox.x) * sprite.scaleFactor.x;
				s.y = (intersect.y - spBox.y) * sprite.scaleFactor.y;
				r.x = (spBox.right - intersect.right) * sprite.scaleFactor.x;
				r.y = (spBox.bottom - intersect.bottom) * sprite.scaleFactor.y;
				const sWidth = sprite.drawBox.width - s.x - r.x;
				const sHeight = sprite.drawBox.height - s.y - r.y;
				let applyTransf = false;
				
				// Apply transformation to the canvas
				if(sprite.transformation.isModified()) {
					const spMatrix = sprite.transformation.matrix;
					const matrix = C.IDENTITY_MATRIX.slice();
					// If sprite is mirrored, apply corrections by moving the canvas to the right position
					if(spMatrix[C.TFR_SCALE_X] < 0) {
						this.applyMirrorTransformation(C.HORIZONTAL, matrix, d, intersect, s, spBox, sprite.scaleFactor);
						applyTransf = true;
					}
					if(spMatrix[C.TFR_SCALE_Y] < 0) {						
						this.applyMirrorTransformation(C.VERTICAL, matrix, d, intersect, s, spBox, sprite.scaleFactor);
						applyTransf = true;
					}
					if(applyTransf) {
						this._ctx.setTransform(...matrix);
					}
				}
				
				// https://jsperf.com/canvas-drawimage-vs-putimagedata/3
				this._ctx.drawImage(
					sprite.view,     // image
					s.x,              // sx
					s.y,              // sy
					sWidth,          // sWidth
					sHeight,         // sHeight
					d.x,              // dx
					d.y,              // dy
					intersect.width, // dWidth
					intersect.height // dHeight
				);
				
				if(applyTransf) {
					this.resetTransformation();
				}
				
				if(this._debug) {
					this._ctx.strokeStyle = 'red';
					this._ctx.strokeRect(d.x, d.y, intersect.width, intersect.height);
				}
			}
		}
	}
	
	setAntialias(antialias) {
		this._antialias = antialias;
		this._ctx.imageSmoothingEnabled = antialias;
		
		if(!antialias) {
			this._canvas.classList.add(C.CL_PIXELATED);
		} else {
			this._canvas.classList.remove(C.CL_PIXELATED);
		}
	}
	
	applyMirrorTransformation(dimension, matrix, d, intersect, s, spBox, scaleFactor) {
		let axis,
			D,
			S,
			intersectSize,
			spBoxSize;
			
		if(dimension === C.HORIZONTAL) {
			axis = 'x';
			D = C.TFR_DX;
			S = C.TFR_SCALE_X;
			intersectSize = intersect.width;
			spBoxSize = spBox.width;
		} else {
			axis = 'y';
			D = C.TFR_DY;
			S = C.TFR_SCALE_Y;
			intersectSize = intersect.height;
			spBoxSize = spBox.height;
		}
		
		matrix[D] = d[axis] * 2 + intersectSize;  // Displacement of the canvas to align with the sprite
		s[axis] -= (spBoxSize - intersectSize) * scaleFactor[axis];  // Fix source position
		if(s[axis] < 0) {
			s[axis] *= -1;
		}
		matrix[S] = -1;		
	}
	
	resetTransformation() {
		// this._ctx.resetTransform();  // Not yet available
		this._ctx.setTransform(...C.IDENTITY_MATRIX);
	}
};
