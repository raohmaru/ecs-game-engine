export default class Movement {
	constructor(game) {
		this._game = game;
		this._group = game.ecs.getEntitiesByComponents('Position', 'Velocity', 'Sprite');
		this._stage = game.graphics.stage;
	}

	update(delta) {
		for (let entity of this._group.entities) {
			const position = entity.getComponent('Position');
			const velocity = entity.getComponent('Velocity');
			const sprite = entity.getComponent('Sprite');
			
			if(this._game.input.keyboard.left) {
				position.x -= velocity.x;
			}
			if(this._game.input.keyboard.right) {
				position.x += velocity.x;
			}
			
			if(this._game.input.keyboard.up) {
				position.y -= velocity.y;
			}
			if(this._game.input.keyboard.down) {
				position.y += velocity.y;
			}
			
			if(position.x <= -sprite.view.width) {
				position.x += this._stage.width + sprite.view.width;
			} else if(position.x >= this._stage.width) {
				position.x -= this._stage.width + sprite.view.width;
			}
			
			if(position.y <= -sprite.view.height) {
				position.y += this._stage.height + sprite.view.height;
			} else if(position.y >= this._stage.height) {
				position.y -= this._stage.height + sprite.view.height;
			}
		}
	}
}
