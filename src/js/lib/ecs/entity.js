let currentId = 1;

export default class Entity {
	constructor(id) {
		this._id = id || (currentId++).toString(36);
		this._components = new Map();
		this._mask = 0;
	}
	
	get mask() {
		return this._mask;
	}

	addComponents(...components) {
		components.forEach((component) => {
			this._components.set(component.constructor.id, component);
			this._mask |= component.constructor.mask;
		});
		return this;
	}

	removeComponents(...components) {
		components.forEach((component) => {
			const entityComponent = this._components.get(component);

			if (entityComponent) {
				this._components.delete(entityComponent.constructor.id);
				this._mask &= ~entityComponent.constructor.mask;
			}
		});
		return this;
	}

	hasComponent(component) {
		return this._components.has(component);
	}

	getComponent(component) {
		return this._components.get(component);
	}
}
