export default class SysBackground {
	constructor(game) {
		this._group = game.ecs.getEntitiesByComponents('Background', 'Pattern', 'Translate');
	}

	update() {
		for (let entity of this._group.entities) {
			const bg = entity.getComponent('Background');
			const pattern = entity.getComponent('Pattern');
			const translate = entity.getComponent('Translate');
			
			bg.fillStyle = pattern.fillStyle;
			bg.dx = translate.x;
			bg.dy = translate.y;
		}
	}
}
