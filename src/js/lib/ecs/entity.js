let currentId = 1;

export default class Entity {
	constructor(id) {
		this.id = id || (currentId++).toString(36);
		this.components = new Map();
		this.mask = 0;
	}

	addComponents(...components) {
		components.forEach((component) => {
			this.components.set(component.constructor.id, component);
			this.mask |= component.constructor.mask;
		});
		
		return this;
	}

	removeComponents(...components) {
		components.forEach((component) => {
			const entityComponent = this.components.get(component);

			if (entityComponent) {
				this.components.delete(entityComponent.constructor.id);
				this.mask &= ~entityComponent.constructor.mask;
			}
		});
		return this;
	}

	hasComponent(component) {
		return this.components.has(component);
	}

	getComponent(component) {
		return this.components.get(component);
	}
}
