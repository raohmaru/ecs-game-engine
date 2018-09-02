const now = Date.now;

let throttle = (func, wait) => {
	let lastCallTime = 0,
		newFunc = (...args) => {
			let time = now();
			
			if (time > lastCallTime + wait) {
				func(...args);
				lastCallTime = time;
			}
		};
	
	return newFunc;
};

export {
	throttle
};
