import cfg        from './config.js';
import $          from './util/dom.js';
import Game       from './lib/core/game.js';
import Rrr        from './lib/rrr/rrr.js';
import Movement   from './systems/movement.js';
import Render     from './systems/render.js';
import Position   from './components/position.js';
import Velocity   from './components/velocity.js';
import Sprite     from './components/sprite.js';
import Background from './components/background.js';

// variables
let game;
const $statistics = $('#statistics');
	
function init() {
	game = new Game($('#stage'), Rrr.CANVAS, cfg, {render});
	
	game.ecs.registerComponents(
		Position,
		Velocity,
		Sprite,
		Background
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
			new Sprite(createPlayerSprite())
		);
	game.addSprite(player, 1);
	
	const bg0 = game.ecs
		.createEntity('bg0')
		.addComponents(
			new Background(createBG0Sprite())
		);	
	game.addBackground(bg0, 0);
	
	game.start();
}

function render(delta) {
	$statistics.textContent = 1000 / delta;
}

function createPlayerSprite() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	
	canvas.width = 32;
	canvas.height = 32;
	ctx.fillStyle = '#306426';
	ctx.fillRect(0, 0, 32, 32);
	
	return canvas;
}

function createBG0Sprite() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	
	canvas.width = 32;
	canvas.height = 32;
	ctx.strokeStyle = '#659a56';
	ctx.lineWidth = 2;
	ctx.moveTo(0, 0);
	ctx.lineTo(8, 8);
	ctx.lineTo(16, 0);
	ctx.lineTo(24, 8);
	ctx.lineTo(32, 0);
	ctx.stroke();
	
	return canvas;
}

init();
