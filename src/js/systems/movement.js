export default class Movement {
	constructor(game) {
		this.group = game.ecs.getEntitiesByComponents('Position', 'Velocity', 'Sprite');
		this.world = game.renderer.view;
	}

	update() {
		for (let entity of this.group.entities) {
			const position = entity.getComponent('Position');
			const velocity = entity.getComponent('Velocity');
			const sprite = entity.getComponent('Sprite');
			
			position.x += velocity.x;
			position.y += velocity.y;
			
			if(position.x > this.world.width) {
				position.x = -sprite.view.width;
				position.y += sprite.view.height;
			}
			
			if(position.y >= this.world.height) {
				position.y = 0;
			}
		}
	}
}
