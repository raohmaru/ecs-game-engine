import Entity from './entity.js';
import Group from './group.js';

const components = new Map();
const entities = new Map();
const systems = new Set();
const groups = new Map();
const compId = Symbol('_id');  // Unique object, used as identifier

let bitMask = 0;

const Entity_addComponents_handler = {
    apply: function(target, thisArg, argumentsList) {
        target.apply(thisArg, argumentsList);
		updateGroups(thisArg);
		return thisArg;
    }
};

const getMask = (comps) => {
	return comps.reduce( (acc, compId) => {
		if(components.has(compId)) {
			return acc | components.get(compId).mask;
		}
		return 0;
	}, 0);
};
	
const updateGroups = (entity) => {
	for (let group of groups.values()) {
		group.match(entity);
	}
};

export default {
	registerComponents(...comps) {
		comps.forEach((ComponentClass) => {
			if (ComponentClass[compId]) {
				throw new Error('The component is already registered');
				return;
			}

			ComponentClass[compId] = ComponentClass.name;
			ComponentClass.id = ComponentClass[compId];
			ComponentClass.mask = 1 << bitMask++;
			
			components.set(ComponentClass.id, ComponentClass);
		});
	},
	
	createEntity(id) {
		let entity;
		
		if (entities[id]) {
			throw new Error('The entity already exists');
		}

		entity = new Entity(id);
		entities.set(id, entity);
		entity.addComponents = new Proxy(entity.addComponents, Entity_addComponents_handler);
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
			system.update(delta);
		});
	}
};
