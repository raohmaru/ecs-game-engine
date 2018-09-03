import Entity from './entity.js';

const components = new WeakSet();
const entities = new Map();
const compId = Symbol('_id');  // Unique object, used as identifier
let bitMask = 0;

const registerComponents = (...componentsList) => {
	componentsList.forEach((ComponentClass) => {
		if (ComponentClass[compId]) {
			throw new Error('The component is already registered');
			return;
		}

		ComponentClass[compId] = ComponentClass.name;
		ComponentClass.id = ComponentClass[compId];
		ComponentClass.mask = 1 << bitMask++;
		
		components.add(ComponentClass);
	});
};

const createEntity = (id) => {
	let e;
	
	if (entities[id]) {
		throw new Error('The entity already exists');
	}

	e = new Entity(id);
	entities.set(id, e);
	return e
};

const getEntity = (id) => entities.get(id);

const getEntitiesByComponentsMask = (mask) => {
};

const addSystems = (...systems) => {
};

const update = (delta) => {
};

export default {
	registerComponents,
	createEntity,
	getEntity,
	getEntitiesByComponentsMask,
	addSystems,
	update
};
