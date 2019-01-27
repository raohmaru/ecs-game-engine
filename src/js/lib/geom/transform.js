import C from '../core/const.js';
import Signal from '../util/sgnl.js';

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
	
	reset() {
		this._matrix = C.IDENTITY_MATRIX.slice();
		this._modified = false;
		this.change.emit();
	}
	
	checkModifications() {
		this._modified = this._matrix.join() !== C.IDENTITY_MATRIX.join();
		if(this._modified) {
			this.change.emit();
		}
	}
	
	isModified() {
		return this._modified;
	}
}
