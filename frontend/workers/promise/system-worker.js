/**
 * Helper file to use SystemJS inside Web Worker
 * context.
 */

importScripts('../vendor/system.js', '../vendor/sys-config.js');
onmessage = function(e) {
	System.import(e.data)
		.then(() => {console.log("Loaded worker", e.data)})
		.catch(error => {console.error(error)})
}

function init(e) {
	e.stopPropagation();
	let [, message] = JSON.parse(e.data);
	System.import(message)
		.then(() => {
			self.postMessage("{ready:true}");
		}).catch(error => {console.error(error)});
	self.removeEventListener('message', init);
}
self.addEventListener('message', init);