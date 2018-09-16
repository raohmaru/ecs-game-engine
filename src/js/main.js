import cfg           from './config.js';
import $             from './util/dom.js';
import Game          from './lib/core/game.js';
import Movement      from './systems/movement.js';
import Render        from './systems/render.js';
import Translation   from './systems/translation.js';
import SysBackground from './systems/sysbg.js';
import Sprite        from './components/sprite.js';
import Background    from './components/background.js';
import Pattern       from './components/pattern.js';
import Position      from './components/position.js';
import Velocity      from './components/velocity.js';
import Translate     from './components/translate.js';

// variables
let game;
const $statistics = $('#statistics');
	
function init() {
	game = new Game($('#stage'), Game.CANVAS, cfg, {render});
	
	game.ecs.registerComponents(
		Position,
		Velocity,
		Sprite,
		Background,
		Pattern,
		Translate
	);
	
	game.ecs.addSystems(
		new Movement(game),
		new Translation(game),
		new SysBackground(game),
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
			new Background('#cdf443', game.graphics.stage.width, game.graphics.stage.height)
		);	
	game.addBackground(bg0, 0);
	
	const bg1 = game.ecs
		.createEntity('bg1')
		.addComponents(
			new Background(null, game.graphics.stage.width, game.graphics.stage.height/2),
			new Pattern(createBG1Sprite()),
			new Translate(1, 1)
		);	
	game.addBackground(bg1, 0);
	
	const bg2 = game.ecs
		.createEntity('bg2')
		.addComponents(
			new Background(null, game.graphics.stage.width, game.graphics.stage.height/2, 0, game.graphics.stage.height/2),
			new Pattern(createBG1Sprite()),
			new Translate(-1, -1)
		);	
	game.addBackground(bg2, 0);
	
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

function createBG1Sprite() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	
	canvas.width = 32;
	canvas.height = 32;
	ctx.strokeStyle = '#659a56';
	ctx.lineWidth = 2;
	ctx.moveTo(0, 12);
	ctx.lineTo(8, 20);
	ctx.lineTo(16, 12);
	ctx.lineTo(24, 20);
	ctx.lineTo(32, 12);
	ctx.stroke();
	
	return canvas;
}

init();
