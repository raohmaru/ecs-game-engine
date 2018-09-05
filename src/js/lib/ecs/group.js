export default class Group {
	constructor(mask) {
		this.mask = mask;
		this.entities = new Set();
	}
	
	match(entity) {
		if((this.mask & entity.mask) === this.mask) {
			this.entities.add(entity);
		}
	}
}
