import cfg       from './config.js';
import $         from './lib/dom.js';
import Game      from './lib/core/game.js';
import Movement  from './systems/movement.js';
import Render    from './systems/render.js';
import Position  from './components/position.js';
import Velocity  from './components/velocity.js';
import Sprite    from './components/sprite.js';

// variables
let game;
const $statistics = $('#statistics');
	
function init() {
	game = new Game(cfg, {render});
	
	game.ecs.registerComponents(
		Position,
		Velocity,
		Sprite
	);
	
	game.ecs.addSystems(
		new Movement(game),
		new Render(game)
	);
	
	const player = game.ecs
		.createEntity('player')
		.addComponents(
			new Position(0, 0),
			new Velocity(10, 0),
			new Sprite(createSprite())
		);	
	game.addSprite(player, 0);
	
	game.start();
}

function render(delta) {
	$statistics.textContent = 1000 / delta;
}

function createSprite() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	
	canvas.width = 32;
	canvas.height = 32;
	ctx.fillStyle = '#306426';
	ctx.fillRect(0, 0, 32, 32);
	
	return canvas;
}

init();
