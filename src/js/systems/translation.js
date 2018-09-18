export default class Translation {
	constructor(game) {
		this._group = game.ecs.getEntitiesByComponents('Background', 'Pattern', 'Translate');
	}

	update() {
		for (let entity of this._group.entities) {
			const bg = entity.getComponent('Background');
			const pattern = entity.getComponent('Pattern');
			const translate = entity.getComponent('Translate');
			
			translate.x += translate.dx;
			translate.y += translate.dy;
			
			if(translate.x > pattern.view.width) {
				translate.x -= pattern.view.width;
			} else if(translate.x < -pattern.view.width) {
				translate.x += pattern.view.width;
			}
			
			if(translate.y > pattern.view.height) {
				translate.y -= pattern.view.height;
			} else if(translate.y < -pattern.view.height) {
				translate.y += pattern.view.height;
			}
		}
	}
}
