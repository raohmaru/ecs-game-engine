let currentId = 1;

const getComponentId = (component) => component.id || component.constructor.id || component;

export default class Entity {
	constructor(id) {
		this.id = id || (currentId++).toString(36);
		this.components = new Map();
		this.componentsMask = 0;
	}

	addComponents(...components) {
		components.forEach((component) => {
			this.components.set(component.constructor.id, component);
			this.componentsMask |= component.constructor.mask;
		});
	}

	removeComponents(...components) {
		components.forEach((component) => {
			const entityComponent = this.getComponent(component);

			if (entityComponent) {
				this.components.delete(entityComponent.constructor.id);
				this.componentsMask &= ~entityComponent.constructor.mask;
			}
		});
	}

	hasComponent(component) {
		return this.components.has(getComponentId(component));
	}

	getComponent(Component) {
		return this.components.get(getComponentId(component));
	}
}
