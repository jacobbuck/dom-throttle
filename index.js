/**
 * Creates and returns a new, throttled version of the passed function,
 * that, when invoked repeatedly, will only actually call the original
 * function at most once per every requestAnimationFrame tick.
 * Useful for rate-limiting events that might thrash the DOM.
 * @param func {Function} The function to throttle.
 * @return {Function} Returns the new throttled function.
 */
module.exports = function domThrottle (func) {
	var requestId = false;

	var throttled = function () {
		var context = this;
		var args = arguments;
		if (requestId === false) {
			requestId = window.requestAnimationFrame(function () {
				func.apply(context, args);
				requestId = false;
			});
		}
	};

	throttled.cancel = function () {
		if (requestId !== false) {
			window.cancelAnimationFrame(requestId);
			requestId = false;
		}
	};

	return throttled;
};
