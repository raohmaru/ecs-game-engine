export default class Group {
	constructor(mask) {
		this.mask = mask;
		this.entities = new Set();
	}
	
	match(entities) {
		for (let entity of entities.values()) {
			if(this.mask & entity.mask) {
				this.entities.add(entity);
			}
		}
	}
}
