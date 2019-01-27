import C  from './const.js';
import Beat   from '../util/beat.js';
import ecs    from '../ecs/ecs.js';
import Rrr    from '../rrr/rrr.js';
import Loader from '../net/loader.js';

export default class Game {
	constructor(canvas, rendererType, cfg, states) {
		this._cfg = cfg;
		this._states = states;
		this._graphics = new Rrr(canvas, rendererType, cfg);
		this._beat = new Beat(cfg.fps, this.frame.bind(this));
		this._loader = new Loader(true);
		// Default properties
		this._scenes = [];
		this._currentScene = 0;
	}
	
	get ecs() {
		return ecs;
	}
	
	get graphics() {
		return this._graphics;
	}
	
	get stage() {
		return this._graphics.stage;
	}
	
	get camera() {
		return this._graphics.camera;
	}
	
	get assets() {
		return this._loader;
	}
	
	get currentScene() {
		return this._currentScene;
	}
	set currentScene(id) {
		if(typeof id === 'string') {
			this._currentScene = this._scenes[id];
		} else {
			const values = Object.values(this._scenes);
			this._currentScene = values[id];
		}
	}
	
	prepare() {
		this._loader.start()
			.complete.then(() => {
				this._states.ready && this._states.ready();
			});
	}
	
	start() {
		this._beat.start();
	}

	frame(delta) {
		ecs.update(delta);
		this._states.render && this._states.render(delta);
	}
	
	render() {
		this._graphics.render(this._currentScene);
	}
	
	addScene(scene) {
		this._scenes[scene.id] = scene;
		if(!this._currentScene) {
			this._currentScene = scene;
		}
	}
	
	addCamera(entity) {
		this._graphics.addCamera(entity.getComponent('Camera'));
	}
};

Object.assign(Game, C);
