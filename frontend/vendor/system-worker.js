/**
 * Helper file to use SystemJS inside Web Worker
 * context.
 */

console.log('system-worker online');

importScripts('../vendor/system.js', '../vendor/sys-config.js');

function init(e) {
	e.stopPropagation();
	let [, message] = JSON.parse(e.data);
	console.log(message);
	System.import(message)
		.then(() => {
			self.postMessage('[0,null,"ready"]');
		}).catch(error => {console.error(error)});
	self.removeEventListener('message', init);
}
self.addEventListener('message', init); 