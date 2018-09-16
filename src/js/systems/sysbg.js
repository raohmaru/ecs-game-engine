export default class SysBackground {
	constructor(game) {
		this._group = game.ecs.getEntitiesByComponents('Background', 'Translate');
	}

	update() {
		for (let entity of this._group.entities) {
			const bg = entity.getComponent('Background');
			const translate = entity.getComponent('Translate');
			bg.dx = translate.x;
			bg.dy = translate.y;
		}
	}
}
