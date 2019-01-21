import Asset from './asset.js';
import Signal from '../util/sgnl.js';

export default class Loader {
	constructor(paused = false) {
		this.paused = paused;
		this.queue = [];
		this.assets = new Map();
		this.complete = new Signal();
	}
	
	start() {
		this.paused = false;
		this.loadNext();
		return this;
	}
	
	addToQueue(asset) {
		this.assets.set(asset.path, asset);
		this.queue.push(asset);
		
		if(!this.paused && this.queue.length === 1) {
			this.loadNext();
		}
	}
	
	assetLoaded(data) {
		const asset = this.queue.shift();
		asset.done(data);
		this.loadNext();
	}
	
	loadBitmap(path) {
		if(this.assets.has(path)) {
			return this.assets.get(path).onload;
		} else {
			const asset = new Asset(Asset.BITMAP, path);
			this.addToQueue(asset);
			return asset.onload;
		}
	}
	
	loadNext() {
		if(!this.queue.length) {
			this.complete.emit()
			this.complete.clear();
			return;
		}
			
		const asset = this.queue[0];
		
		fetch(asset.path)
			.then((response) => {
				if(response.status === 200) {
					return response.blob();
				} else {
					return null;
				}
			})
			.then((data) => {
				this.assetLoaded(data);
			})
			.catch((err) => {
				this.assetLoaded(null);
			});
	}
}
