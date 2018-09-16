export default class Translation {
	constructor(game) {
		this._group = game.ecs.getEntitiesByComponents('Background', 'Translate');
	}

	update() {
		for (let entity of this._group.entities) {
			const bg = entity.getComponent('Background');
			const translate = entity.getComponent('Translate');
			
			translate.x += translate.dx;
			translate.y += translate.dy;
			
			if(translate.x > bg.width) {
				translate.x -= bg.width;
			}
			
			if(translate.y > bg.height) {
				translate.y -= bg.height;
			}
		}
	}
}
