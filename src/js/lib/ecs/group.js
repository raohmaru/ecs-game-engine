export default class Group {
	constructor(mask) {
		this._mask = mask;
		this._entities = new Set();
	}
	
	get entities() {
		return this._entities;
	}
	
	match(entity) {
		if((this._mask & entity.mask) === this._mask) {
			this._entities.add(entity);
		}
	}
}
