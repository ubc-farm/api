/**
 * Helper file to use SystemJS inside Web Worker
 * context.
 */

importScripts('../vendor/system.js', '../sys-config.js');

function init(e) {
	e.stopPropagation();
	const [, message] = JSON.parse(e.data);

	System.import(message) //open the module
		.then(() => {
			self.postMessage('[0,null,"ready"]');
		}).catch(error => {console.error(error)});
	
	self.removeEventListener('message', init);
}
self.addEventListener('message', init); 