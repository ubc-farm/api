/**
 * Utility functions
 * @module utils.js
 */

/**
 * Resolves when the DOM is ready to interact with
 * @type {Promise<void>}
 * @author Jake Archibald
 * @see {@link https://github.com/jakearchibald/offline-wikipedia}
 */
export const domReady = new Promise(resolve => {
	function checkState() {
		if (document.readyState != 'loading') resolve();
	}
	document.addEventListener('readystatechange', checkState);
	checkState();
})

/**
 * Creates a promise that can be resolved from the outside.
 * Used for async scripts and their onload attributes.
 * @property {Promise<any>} promise
 * @property {function} resolve - resolves the promise
 * @property {function} reject - rejects the promise
 */
export class Deferred extends Promise {
	constructor() {
		var _resolve, _reject;
		super((resolve, reject) => {
			_resolve = resolve;
			_reject = reject;
		})
		
		this.resolve = _resolve;
		this.reject = _reject;
	}
}