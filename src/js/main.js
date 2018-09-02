import * as cfg  from './config.js';
import * as env  from './env.js';
import * as _    from './lib/util.js';
// import $         from './lib/dom.js';
import Beat      from './lib/beat.js';
import ecs       from './lib/ecs/ecs.js';
import Position  from './components/position.js';
import Player    from './modules/player/player.module.js';

// variables
let beat;
	
function init() {
	new Player();
	
	beat = new Beat(cfg.fps, frame);
	beat.start();
	
	ecs.registerComponents(Position);
	ecs.createEntity('player')
		.addComponents(
			new Position(0, 0)
		);
	console.log(ecs.getEntity('player'));
}

function frame(delta) {
	ecs.update(delta);
}

init();
