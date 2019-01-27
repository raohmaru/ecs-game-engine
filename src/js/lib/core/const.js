const cfg = {
	CANVAS: 'canvas',
	CL_PIXELATED: 'rrr-pixelated',
	IDENTITY_MATRIX: [1, 0, 0, 1, 0, 0],
	
	TFR_SCALE_X: 0,
	TFR_SCALE_Y: 3,
	TFR_SKEW_X: 2,
	TFR_SKEW_Y: 1,
	TFR_DX: 4,
	TFR_DY: 5,
	
	KB_LEFT: 37,
	KB_UP: 38,
	KB_RIGHT: 39,
	KB_DOWN: 40,
	
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical'
};
export default cfg;

const keyCodes = [];
keyCodes[cfg.KB_LEFT]  = 'left';
keyCodes[cfg.KB_UP]    = 'up';
keyCodes[cfg.KB_RIGHT] = 'right';
keyCodes[cfg.KB_DOWN]  = 'down';
export { keyCodes };
