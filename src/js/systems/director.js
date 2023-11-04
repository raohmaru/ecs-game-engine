export class Director {
	constructor(game) {
		this._game = game;
		this._group = game.ecs.getEntitiesByComponents('Camera');
		this._stage = game.stage;
	}

	update(delta) {
		const scene = this._game.currentScene;
		
		for (let entity of this._group.entities) {
			const camera = entity.getComponent('Camera');
			const cameraViewport = camera.viewport;
			let x;
			let y;
			
			if(camera.followSprite) {
				const position = camera.followSprite.getComponent('Position');
				const sprite = camera.followSprite.getComponent('Sprite');
				x = position.x + (sprite.width  >> 1) - (cameraViewport.width  >> 1);
				y = position.y + (sprite.height >> 1) - (cameraViewport.height >> 1);
			}
			
			if(scene.width) {
				if(x < 0) {
					x = 0;
				} else if(x + cameraViewport.width > scene.width) {
					x = scene.width - cameraViewport.width;
				}
			}
			
			if(scene.height) {
				if(y < 0) {
					y = 0;
				} else if(y + cameraViewport.height > scene.height) {
					y = scene.height - cameraViewport.height;
				}
			}
			
			if(x !== undefined) {
				camera.x = x;
			}
			if(y !== undefined) {
				camera.y = y;
			}
		}
	}
}
