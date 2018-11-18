import cfg           from './config.js';
import $             from './util/dom.js';
import Game          from './lib/core/game.js';
import Scene         from './lib/core/scene.js';
import Movement      from './systems/movement.js';
import Render        from './systems/render.js';
import Translation   from './systems/translation.js';
import Keyboard      from './systems/keyboard.js';
import Director      from './systems/director.js';
import Sprite        from './components/sprite.js';
import Background    from './components/background.js';
import Position      from './components/position.js';
import Velocity      from './components/velocity.js';
import Translate     from './components/translate.js';
import Camera        from './components/camera.js';

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
		Translate,
		Camera
	);
	
	game.ecs.addSystems(
		new Movement(game),
		new Translation(game),
		new Keyboard(game),
		new Director(game),
		new Render(game)
	);
	
	const scene0 = new Scene(game, 'scene0', 480, 320);
	game.addScene(scene0);
	game.currentScene = 0;
	
	const player = game.ecs
		.createEntity('player')
		.addComponents(
			new Sprite(createPlayerSprite()),
			new Position(0, 0),
			new Velocity(16, 16)
		);
	scene0.addSprite(player, 1);
	
	const bg1 = game.ecs
		.createEntity('bg1')
		.addComponents(
			new Background({
				view    : createBG1Sprite(),
				width   : game.stage.width,
				height  : game.stage.height,
				parallax: true
				// fixed: true
			}),
			// new Translate(1, 1)
		);
	scene0.addBackground(bg1, 0);
	
	const bg0 = game.ecs
		.createEntity('bg0')
		.addComponents(
			new Background({
				view  : '#cdf443',
				width : game.stage.width/2,
				height: game.stage.height/2,
				x     : 64,
				y     : 32
			 })
		);	
	scene0.addBackground(bg0, 0);
	
	const bg3 = game.ecs
		.createEntity('bg3')
		.addComponents(
			new Background({
				view  : createBG1Sprite(),
				width : game.stage.width/2,
				height: game.stage.height/2,
				x     : 64,
				y     : 32
			}),
			new Translate(0, 1)
		);	
	scene0.addBackground(bg3, 0);
	
	const bg2 = game.ecs
		.createEntity('bg2')
		.addComponents(
			new Background({
				view  : createBG1Sprite(),
				width : game.stage.width,
				height: game.stage.height/2,
				x     : 0,
				y     : game.stage.height/2
			}),
			new Translate(-1, -1)
		);	
	scene0.addBackground(bg2, 0);
	
	const camera = game.ecs
		.createEntity('camera')
		.addComponents(
			new Camera(game)
		);
	camera.getComponent('Camera').follow(player);
	game.addCamera(camera);
	
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
