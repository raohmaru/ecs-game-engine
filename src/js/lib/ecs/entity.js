let currentId = 1;

export default class Entity {
	constructor(id) {
		this.id = id || (currentId++).toString(36);
		this.components = new Map();
		this.componentsMask = 0;
	}
	
	get mask() {
		return this.componentsMask;
	}

	addComponents(...components) {
		components.forEach((component) => {
			this.components.set(component.constructor.id, component);
			this.componentsMask |= component.constructor.mask;
		});
	}

	removeComponents(...components) {
		components.forEach((component) => {
			const entityComponent = this.components.get(component);

			if (entityComponent) {
				this.components.delete(entityComponent.constructor.id);
				this.componentsMask &= ~entityComponent.constructor.mask;
			}
		});
	}

	hasComponent(component) {
		return this.components.has(component);
	}

	getComponent(component) {
		return this.components.get(component);
	}
}
