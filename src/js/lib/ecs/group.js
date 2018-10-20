import Sgnl from '../util/sgnl.js';

export default class Group {
	constructor(mask) {
		this._mask = mask;
		this._entities = new Set();
		this.onAdded = new Sgnl();
	}
	
	get entities() {
		return this._entities;
	}
	
	match(entity) {
		if((this._mask & entity.mask) === this._mask) {
			this._entities.add(entity);
			this.onAdded.emit(entity);
		}
	}
}
