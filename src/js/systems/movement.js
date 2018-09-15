export default class Movement {
	constructor(game) {
		this._group = game.ecs.getEntitiesByComponents('Position', 'Velocity', 'Sprite');
		this._stage = game.graphics.stage;
	}

	update() {
		for (let entity of this._group.entities) {
			const position = entity.getComponent('Position');
			const velocity = entity.getComponent('Velocity');
			const sprite = entity.getComponent('Sprite');
			
			position.x += velocity.x;
			position.y += velocity.y;
			
			if(position.x > this._stage.width) {
				position.x = -sprite.view.width;
				position.y += sprite.view.height;
			}
			
			if(position.y >= this._stage.height) {
				position.y = 0;
			}
		}
	}
}
