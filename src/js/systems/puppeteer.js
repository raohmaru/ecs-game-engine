const abs = Math.abs;

export default class Puppeter {
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
					sprite.transformation.scaleX = -abs(sprite.transformation.scaleX);
				}
				if(direction.right) {
					sprite.transformation.scaleX = abs(sprite.transformation.scaleX);
				}
				if(direction.up) {
					sprite.transformation.scaleY = -abs(sprite.transformation.scaleY);
				}
				if(direction.down) {
					sprite.transformation.scaleY = abs(sprite.transformation.scaleY);
				}
			}
		}
	}
}
