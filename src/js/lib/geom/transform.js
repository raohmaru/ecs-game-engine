import C from '../core/const.js';
import Signal from '../util/sgnl.js';
import { toRad } from '../util/mth.js';

export default class Transform {
	constructor() {
		this.change = new Signal();
		this.reset();
	}
	
	get matrix() {
		return this._matrix.slice();
	}
	
	get scaleX() {
		return this._matrix[C.TFR_SCALE_X];
	}
	
	set scaleX(value) {
		this._matrix[C.TFR_SCALE_X] = value;
		this.checkModifications();
	}
	
	get scaleY() {
		return this._matrix[C.TFR_SCALE_Y];
	}
	
	set scaleY(value) {
		this._matrix[C.TFR_SCALE_Y] = value;
		this.checkModifications();
	}
	
	get rotation() {
		return this._rotation;
	}
	
	set rotation(value) {
		this._rotation = toRad(value);
		this.checkModifications();
	}
	
	reset() {
		this._matrix = C.IDENTITY_MATRIX.slice();
		this._rotation = 0;
		this._modified = false;
		this.change.emit();
	}
	
	checkModifications() {
		this._modified = this._matrix.join() !== C.IDENTITY_MATRIX.join() || this._rotation !== 0;
		if(this._modified) {
			this.change.emit();
		}
	}
	
	isModified() {
		return this._modified;
	}
}
