export default class Beat {
	constructor(fps = 60, cb) {
		this._fps = fps;
		this._cb = cb;
		
		this._fpsInterval = 1000 / fps;
		this._currentTime = 0;
		this._frameCount = 0;
		this._accumulator = 0;
	}
	
	get currentFps() {
		return 1000 / (this._currentTime - this._previousTime);
	}

	start() {
		this._startTime = window.performance.now();
		this._previousTime = this._startTime;
		this._previousDeltaTime = this._startTime;
		// Wrapper to keep the scope (faster than .bind()?)
		this._onFrame = (currentTime) => this.frame(currentTime);
		this.frame(this._startTime);
	}

	stop() {
		window.cancelAnimationFrame(this._timerID);
		this._cb = null;
		this._onFrame = null;
	}

	frame(currentTime) {
		// calc elapsed time since last loop
		let delta = currentTime - this._previousDeltaTime;		
		// if enough time has elapsed, draw the next frame
		if (delta >= this._fpsInterval) {
			// Adjust next execution time in case this frame took longer to execute
			this._previousDeltaTime = currentTime - (delta % this._fpsInterval);
			this._cb(currentTime - this._previousTime);
			
			this._frameCount++;
			this._previousTime = currentTime;
		}
		
		this._currentTime = currentTime;
		this._timerID = window.requestAnimationFrame(this._onFrame);
	}
};
