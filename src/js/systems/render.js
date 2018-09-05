export default class Render {
	constructor(game) {
		this.renderer = game.renderer;
		this.group = game.ecs.getEntitiesByComponents('Position', 'Sprite');
	}

	update() {
		for (let entity of this.group.entities) {
			const position = entity.getComponent('Position');
			const sprite = entity.getComponent('Sprite');
			sprite.x = position.x;
			sprite.y = position.y;
		}

		this.renderer.render();
	}
}
