import Entity from './entity.js';
import Group from './group.js';

const components = new Map();
const entities = new Map();
const systems = new Set();
const groups = new Map();
const compId = Symbol('_id');  // Unique object, used as identifier

let bitMask = 0;

const proxyEntity = (method) => {
	return {
		apply: function(target, entity, argumentsList) {
			target.apply(entity, argumentsList);
			updateGroups(entity, method);
			return entity;
		}
	}
}
	
const updateGroups = (entity, method) => {
	for (let group of groups.values()) {
		if (group.match(entity)) {
			group[method](entity);
		}
	}
};

const getMask = (comps) => {
	return comps.reduce( (acc, id) => {
		if(components.has(id)) {
			return acc | components.get(id).mask;
		}
		return 0;
	}, 0);
};

export default {
	registerComponents(...comps) {
		comps.forEach((ComponentClass) => {
			if (ComponentClass[compId] && ComponentClass[compId] === ComponentClass.name) {
				throw new Error(`The component ${ComponentClass.name} is already registered`);
			}
			ComponentClass[compId] = ComponentClass.name;
			ComponentClass.id = ComponentClass[compId];
			ComponentClass.mask = 1 << bitMask++;
			components.set(ComponentClass.id, ComponentClass);
		});
	},
	
	createEntity(id) {
		if (entities[id]) {
			throw new Error(`The entity ${id} already exists`);
		}
		let entity = new Entity(id);
		entities.set(id, entity);
		entity.addComponents = new Proxy(entity.addComponents, proxyEntity('add'));
		entity.removeComponents = new Proxy(entity.removeComponents, proxyEntity('remove'));
		return entity;
	},
	
	getEntity(id) {
		return entities.get(id)
	},
	
	getEntitiesByComponents(...comps) {
		const mask = getMask(comps);
		if(groups.has(mask)) {
			return groups.get(mask);
		}
		const group = new Group(mask);
		for (let entity of entities.values()) {
			group.match(entity);
		}
		groups.set(mask, group);
		return group;
	},
	
	addSystems(...sys) {
		sys.forEach(system => systems.add(system));
	},
	
	update(delta) {
		systems.forEach((system) => {
			system.update && system.update(delta);
		});
	}
};
