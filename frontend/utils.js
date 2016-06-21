/**
 * Utility functions
 * @module frontend/utils
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
 * @deprecated Try to avoid using when possible, this is a hacky promise
 * @property {Promise} promise - the promise
 * @property {function} resolve - resolves the promise
 * @property {function} reject - rejects the promise
 */
export class Deferred {
	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
}