/**
 * Checks if the document has a non-loading readystate, and resolves
 * once it does/changes to be ready.
 * @param {Document} document
 * @returns {Promise} resolves when ready
 */
export const isReady = document => new Promise(resolve => {
	function checkState() {
		if (document.readyState != 'loading') resolve();
	};
	document.addEventListener('readystatechange', checkState);
	checkState();
})

/**
 * Resolves when the DOM is ready to interact with
 * @type {Promise<void>}
 * @author Jake Archibald
 * @see {@link https://github.com/jakearchibald/offline-wikipedia}
 * @requires document
 */
const domReady = typeof document === 'undefined' 
	? null
	: isReady(document);
export default domReady;