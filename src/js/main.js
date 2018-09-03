import * as cfg  from './config.js';
import * as env  from './env.js';
import * as _    from './lib/util.js';
import $         from './lib/dom.js';
import Beat      from './lib/beat.js';
import ecs       from './lib/ecs/ecs.js';
import Rrr       from './lib/rrr/rrr.js';
import Position  from './components/position.js';
import Sprite    from './components/sprite.js';

// variables
let beat;
let renderer;
	
function init() {
	beat = new Beat(cfg.FPS, frame);
	beat.start();
	
	ecs.registerComponents(Position, Sprite);
	ecs.createEntity('player')
		.addComponents(
			new Position(0, 0),
			new Sprite(createSprite())
		);
	
	renderer = new Rrr($('#world'), Rrr.CANVAS, cfg.BGCOLOR);
	renderer.addSprite(ecs.getEntity('player').getComponent('Sprite'), 0);
}

function frame(delta) {
	ecs.update(delta);
	renderer.render();
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
