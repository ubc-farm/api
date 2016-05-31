/**
 * Fork of https://github.com/nolanlawson/promise-worker
 */

var messageIds = 0;
export default class PromiseWorker extends Worker {
	constructor(file) {
		this.callbacks = new Map();
		super(file);
		this.addEventListener('message', e => {
			let [messageId, error, result] = JSON.parse(e.data);
			
			let callback = this.callbacks.get(messageId);
			if (!callback) return;
			this.callbacks.delete(messageId);
			
			callback(error, result);
		})
	}
	
	postMessage(userMessage) {
		let messageId = messageIds++;
		return new Promise((resolve, reject) => {
			this.callbacks.set(messageId, (err, result) => {
				if (err) return reject(new Error(err));
				resolve(result);
			});
			super.postMessage(JSON.stringify([messageId, userMessage]));
		})
	}
}