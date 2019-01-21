export default class Signal {
	constructor() {
		this._listeners = [];
	}

	then(callback) {
		this._listeners.push(callback);
	}

	emit(...args) {
		let i = this._listeners.length;
		while(i-- > 0) {
			this._listeners[i](...args);
		}
	}
	
	remove(callback) {
		this._listeners = this._listeners.filter( (func) => func !== callback );
	}
	
	clear() {
		this._listeners.length = 0;
	}
};
