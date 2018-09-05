import Beat from '../beat.js';
import ecs  from '../ecs/ecs.js';
import Rrr  from '../rrr/rrr.js';

export default class Game {
	constructor(cfg, states) {
		this.cfg = cfg;
		this.states = states;
		this.ecs = ecs;
		this.renderer = new Rrr(cfg.canvas, cfg.renderer, cfg.canvasColor);
		this.beat = new Beat(cfg.fps, this.frame.bind(this));
	}
	
	start() {
		this.beat.start();
	}

	frame(delta) {
		ecs.update(delta);
		this.states.render && this.states.render(delta);
	}
	
	addSprite(entity, layer) {
		if(entity.hasComponent('Sprite')) {
			this.renderer.addSprite(entity.getComponent('Sprite'), layer);
		}
	}
};

