const abs = Math.abs;

export class Puppeteer {
	constructor(game) {
		this._game = game;
		this._group = game.ecs.getEntitiesByComponents('Sprite');
	}

	update(delta) {
		for (let entity of this._group.entities) {
			const sprite = entity.getComponent('Sprite');
			const direction = entity.getComponent('Direction');
			
			if(direction) {
				if(direction.left) {
					sprite.transform.scaleX = -abs(sprite.transform.scaleX);
				}
				if(direction.right) {
					sprite.transform.scaleX = abs(sprite.transform.scaleX);
				}
				if(direction.up) {
					sprite.transform.scaleY = -abs(sprite.transform.scaleY);
				}
				if(direction.down) {
					sprite.transform.scaleY = abs(sprite.transform.scaleY);
				}
			}
		}
	}
}
