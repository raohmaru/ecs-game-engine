const createPattern = (fillStyle, repetition) => {
	if(typeof fillStyle !== 'string') {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		return ctx.createPattern(fillStyle, repetition);
	}
	
	return fillStyle;
}

export default class Background {
	constructor(view, width, height, x = 0, y = 0, repetition = 'repeat') {
		this.fillStyle = createPattern(view, repetition);
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.repetition = repetition;
	}
};
