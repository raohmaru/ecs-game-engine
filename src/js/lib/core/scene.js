let currentId = 1;
export default class Scene {
	constructor(game, id, width = 0, height = 0) {
		this._game = game;
		this._id = id || (currentId++).toString(36);
		this._width = width;
		this._height = height;
		this._layers = [];
	}
	
	get layers() {
		return this._layers;
	}
	
	get id() {
		return this._id;
	}
	
	get width() {
		return this._width;
	}
	
	get height() {
		return this._height;
	}

	addObjectToLayer(obj, layerId, layers) {	
		obj.layer = layerId;
		if(!layers[layerId]) {
			layers[layerId] = new Set();
		}
		layers[layerId].add(obj);
		
		if(obj.path) {
			this._game.assets.loadBitmap(obj.path)
				.then((bmp) => obj.updateView(bmp));
		}
	}

	addSprite(entity, layer = 1) {
		this.addObjectToLayer(entity.getComponent('Sprite'), layer, this._layers);
	}
	
	addBackground(entity, layer = 0) {
		this.addObjectToLayer(entity.getComponent('Background'), layer, this._layers);
	}
};
