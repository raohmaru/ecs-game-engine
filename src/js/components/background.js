export default class Background {
	constructor(view, width = 0, height = 0, repetition = 'repeat') {
		this.fillStyle = view;
		this.width = width;
		this.height = height;
		this.repetition = repetition;
	}
};
