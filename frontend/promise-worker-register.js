/**
 * Fork of https://github.com/nolanlawson/promise-worker
 */

export function register(callback) {
	if (typeof callback !== 'function') 
		throw TypeError('Pass a function into register()');
		
	self.addEventListener('message', e => {
		let [messageId, message] = JSON.parse(e.data);
		Promise.resolve().then(() => callback(message))
			.then(result => {
				self.postMessage(JSON.stringify([messageId, error.message]))
			})
			.catch(error => {
				self.postMessage(JSON.stringify([messageId, null, result]));
			});
	})
}