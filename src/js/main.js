import * as cfg  from './config.js';
import * as env  from './env.js';
import * as _    from './lib/util.js';
import $         from './lib/dom.js';
import Beat      from './lib/beat.js';
import ecs       from './lib/ecs/ecs.js';
import Rrr       from './lib/rrr/rrr.js';
import Movement  from './systems/movement.js';
import Render    from './systems/render.js';
import Position  from './components/position.js';
import Velocity  from './components/velocity.js';
import Sprite    from './components/sprite.js';

// variables
let beat;
let renderer;
let $statistics = $('#statistics');
	
function init() {
	beat = new Beat(cfg.FPS, frame);
	beat.start();
	
	ecs.registerComponents(
		Position,
		Velocity,
		Sprite
	);
	
	ecs.createEntity('player')
		.addComponents(
			new Position(0, 0),
			new Velocity(10, 0),
			new Sprite(createSprite())
		);
	
	renderer = new Rrr($('#world'), Rrr.CANVAS, cfg.BGCOLOR);
	renderer.addSprite(ecs.getEntity('player').getComponent('Sprite'), 0);
	
	ecs.addSystems(
		new Movement(ecs, renderer.world),
		new Render(ecs, renderer)
	);
}

function frame(delta) {
	ecs.update(delta);
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
