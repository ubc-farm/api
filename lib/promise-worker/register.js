'use strict';

/**
 * Calls the function passed whenever a message is posted to the web worker. 
 * @module frontend/workers/promise/register
 * @param {function} callback - handles the message
 * @param {function} reviver - used by JSON.parse to prescribe transformations
 * @listens Worker~message 
 */
export default function register(callback, reviver) {
	self.addEventListener('message', e => {
		const [messageId, message] = JSON.parse(e.data, reviver);
		
		if (typeof callback !== 'function') {
			let err = new TypeError('register() needs a callback function');
			err.messageId = messageId;
			self.postMessage(err);
			throw err;
		}
		
		Promise.resolve(callback(message))
			.catch(error => {
				error.messageId = messageId;
				self.postMessage(error)
			}).then(finalResult => {
				self.postMessage(JSON.stringify([messageId, null, finalResult]))
			})
	});
}