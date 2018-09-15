import Beat from '../beat.js';
import ecs  from '../ecs/ecs.js';
import Rrr  from '../rrr/rrr.js';

export default class Game {
	constructor(canvas, rendererType, cfg, states) {
		this._cfg = cfg;
		this._states = states;
		this._ecs = ecs;
		this._graphics = new Rrr(canvas, rendererType, cfg);
		this._beat = new Beat(cfg.fps, this.frame.bind(this));
	}
	
	get ecs() {
		return this._ecs;
	}
	
	get graphics() {
		return this._graphics;
	}
	
	start() {
		this._beat.start();
	}

	frame(delta) {
		ecs.update(delta);
		this._states.render && this._states.render(delta);
	}
	
	addSprite(entity, layer = 1) {
		this._graphics.addSprite(entity.getComponent('Sprite'), layer);
	}
	
	addBackground(entity, layer = 0) {
		this._graphics.addSprite(entity.getComponent('Background'), layer);
	}
};

