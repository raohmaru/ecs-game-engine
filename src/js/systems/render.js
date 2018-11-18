export default class Render {
	constructor(game) {
		this._game = game;
		this._sprites = game.ecs.getEntitiesByComponents('Position', 'Sprite');
		this._bgs = game.ecs.getEntitiesByComponents('Background', 'Translate');
	}

	update() {
		for (let entity of this._sprites.entities) {
			const position = entity.getComponent('Position');
			const sprite = entity.getComponent('Sprite');
			
			sprite.x = position.x;
			sprite.y = position.y;
		}
		
		for (let entity of this._bgs.entities) {
			const bg = entity.getComponent('Background');
			const translate = entity.getComponent('Translate');
			
			bg.dx = translate.x;
			bg.dy = translate.y;
		}

		this._game.render();
	}
}
