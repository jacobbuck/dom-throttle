/**
 * Creates and returns a new, throttled version of the passed function,
 * that, when invoked repeatedly, will only actually call the original
 * function at most once per every requestAnimationFrame tick.
 * Useful for rate-limiting events that might thrash the DOM.
 * @param func {Function} The function to throttle.
 * @return {Function} Returns the new throttled function.
 */
const domThrottle = func => {
	let requestId = false;

	const throttled = function (...args) {
		if (requestId === false) {
			requestId = window.requestAnimationFrame(() => {
				func(...args);
				requestId = false;
			});
		}
	};

	throttled.cancel = () => {
		if (requestId !== false) {
			window.cancelAnimationFrame(requestId);
			requestId = false;
		}
	};

	return throttled;
};

export default domThrottle;
