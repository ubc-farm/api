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
		let [messageId, message] = JSON.parse(e.data, reviver);
		
		if (typeof callback !== 'function') {
			postOutgoingMessage(messageId, 'Please pass a function into register().');
		}
		
		Promise.resolve(callback(message))
			.catch(error => {
				self.postMessage(JSON.stringify([messageId, error.message]))
			}).then(finalResult => {
				self.postMessage(JSON.stringify([messageId, null, finalResult]))
			}).catch(postError => {
				self.postMessage(JSON.stringify([messageId, postError.message]))
			})
	});
}