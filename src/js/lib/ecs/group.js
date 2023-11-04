export default class Group {
	constructor(mask) {
		this._mask = mask;
		this._entities = new Set();
	}
	
	get entities() {
		return this._entities;
	}
	
	match(entity) {
		return (this._mask & entity.mask) === this._mask;
	}

	add(entity) {
		this._entities.add(entity);
	}

	remove(entity) {
		this._entities.delete(entity);
	}

	has(entity) {
		return this._entities.has(entity);
	}
}
