/**
 * Fork of https://github.com/nolanlawson/promise-worker
 */

export function register(callback) {
	if (typeof callback !== 'function') 
		throw TypeError('Pass a function into register()');
	
	function postOutgoing(messageId, results) {
		if (results instanceof Error) {
			console.error('Worker caught an error:', error);
			self.postMessage(JSON.stringify([messageId, error.message]));
		} else {
			self.postMessage(JSON.stringify([messageId, null, result]));
		}
	}
		
	self.addEventListener('message', e => {
		let [messageId, message] = JSON.parse(e.data);
		Promise.resolve().then(() => callback(message))
			.then(result => postOutgoing(messageId, result))
			.catch(error => postOutgoing(messageId, error));
	})
}