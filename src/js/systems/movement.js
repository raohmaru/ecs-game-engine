export default class Movement {
	constructor(game) {
		this._game = game;
		this._group = game.ecs.getEntitiesByComponents('Position', 'Velocity', 'Sprite');
		this._stage = game.stage;
	}

	update(delta) {
		for (let entity of this._group.entities) {
			const position = entity.getComponent('Position');
			const velocity = entity.getComponent('Velocity');
			const keyboard = this._game.input.keyboard;
			
			if(keyboard.left) {
				position.x -= velocity.x;
			}
			if(keyboard.right) {
				position.x += velocity.x;
			}
			
			if(keyboard.up) {
				position.y -= velocity.y;
			}
			if(keyboard.down) {
				position.y += velocity.y;
			}
		}
	}
}
