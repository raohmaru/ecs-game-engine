import Signal from '../util/sgnl.js';

export default class Asset {
	constructor(type, path) {
		this.type = type;
		this.path = path;
		this.onload = new Signal();
	}
	
	done(data) {
		if(data) {
			if(this.type === Asset.BITMAP) {
				this.transformToBitmap(data);
			}
		} else {
			this.triggerLoaded(null);
		}
	}
	
	transformToBitmap(data) {
		const filereader = new FileReader();
		const img = new Image();
		filereader.addEventListener('load', (e) => {
			img.src = filereader.result;
			this.triggerLoaded(img);
		});
		// filereader.readAsArrayBuffer(data);
		filereader.readAsDataURL(data);
	}
	
	triggerLoaded(data) {
		this.onload.emit(data);	
		this.onload.clear();
		this.onload = null;
	}
}

Asset.BITMAP = 'bitmap';
