export default class Translation {
	constructor(game) {
		this._group = game.ecs.getEntitiesByComponents('Background', 'Translate');
	}

	update() {
		for (let entity of this._group.entities) {
			const bg = entity.getComponent('Background');
			const translate = entity.getComponent('Translate');
			
			if(translate.dx !== 0) {
				translate.x += translate.dx;
			
				if(translate.x > bg.view.width) {
					translate.x -= bg.view.width;
				} else if(translate.x < -bg.view.width) {
					translate.x += bg.view.width;
				}
			}
			
			if(translate.dy !== 0) {
				translate.y += translate.dy;
				
				if(translate.y > bg.view.height) {
					translate.y -= bg.view.height;
				} else if(translate.y < -bg.view.height) {
					translate.y += bg.view.height;
				}
			}
		}
	}
}
