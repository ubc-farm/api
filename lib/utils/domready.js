/**
 * Resolves when the DOM is ready to interact with
 * @type {Promise<void>}
 * @author Jake Archibald
 * @see {@link https://github.com/jakearchibald/offline-wikipedia}
 * @requires document
 */
const domReady = new Promise(resolve => {
	try {
		function checkState() {
			if (document.readyState != 'loading') resolve();
		}
		document.addEventListener('readystatechange', checkState);
		checkState();
	} catch (e) {
		if (!e.message.includes('document')) throw e;
		//document is undefined. Catching to prevent errors in node.js debugger
	}
})
export default domReady;