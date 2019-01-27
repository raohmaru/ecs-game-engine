import C, { keyCodes } from '../lib/core/const.js';

export default class Keyboard {
	constructor(game) {
		game.input = game.input || {};
		this._keyboard = game.input.keyboard = {};
		
		const stage = game.stage;
		// Making the canvas focusable enables the keyboard events on it
		stage.setAttribute('tabindex', '1');
		stage.focus();
		stage.addEventListener('keydown', this.onKeyDown.bind(this));
		stage.addEventListener('keyup', this.onKeyUp.bind(this));
	}

	onKeyDown(e) {
		if(keyCodes[e.keyCode]) {
			this._keyboard[keyCodes[e.keyCode]] = true;
		}
	}

	onKeyUp(e) {
		if(keyCodes[e.keyCode]) {
			this._keyboard[keyCodes[e.keyCode]] = false;
		}
	}
}
