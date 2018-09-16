const createPattern = (fillStyle, repetition) => {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	return ctx.createPattern(fillStyle, repetition);
}

export default class Pattern {
	constructor(view, repetition = 'repeat') {
		this.fillStyle = createPattern(view, repetition);
		this.repetition = repetition;
	}
};
