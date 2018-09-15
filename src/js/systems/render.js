export default class Render {
	constructor(game) {
		this._graphics = game.graphics;
		this._group = game.ecs.getEntitiesByComponents('Position', 'Sprite');
	}

	update() {
		for (let entity of this._group.entities) {
			const position = entity.getComponent('Position');
			const sprite = entity.getComponent('Sprite');
			sprite.x = position.x;
			sprite.y = position.y;
		}

		this._graphics.render();
	}
}
