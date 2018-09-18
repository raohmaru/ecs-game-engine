const cfg = {
	CANVAS: 'canvas',
	CL_PIXELATED: 'rrr-pixelated',
	IDENTITY_MATRIX: [1, 0, 0, 1, 0, 0],
	
	KB_LEFT: 37,
	KB_UP: 38,
	KB_RIGHT: 39,
	KB_DOWN: 40
};
export default cfg;

const keyCodes = [];
keyCodes[cfg.KB_LEFT]  = 'left';
keyCodes[cfg.KB_UP]    = 'up';
keyCodes[cfg.KB_RIGHT] = 'right';
keyCodes[cfg.KB_DOWN]  = 'down';
export { keyCodes };
