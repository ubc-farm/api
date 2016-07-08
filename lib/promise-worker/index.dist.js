/**
 * @module lib/promise-worker
 * @see https://github.com/NotWoods/promise-worker
 */

var messageIds = 0; //incrementor for IDs

/**
 * A Web Worker that returns a promise when calling postMessage.
 * Additionally stringifies messages for performance.
 * @see https://github.com/NotWoods/promise-worker
 */
exports.default = class PromiseWorker {
	/**
   * @param {DOMString|Worker} file - url to worker script
   */
  constructor(file) {
    if (typeof Worker === 'undefined') return;
    /** @member {Worker} _worker */
    if (file instanceof Worker) this._worker = file;  
    else this._worker = new Worker(file);
    /** @member {Map<number, function>} _callbacks */
    this._callbacks = new Map();

    /**
     * @alias PromiseWorker.onmessage
     * @listens Worker~message
     * Handles messages sent back from the worker, then
     * calls the callback with the corresponding ID.
     */
    this._worker.addEventListener('message', ({data}) => {
      let messageId, result, error;
      try {
        [messageId, result] = JSON.parse(data);
      } catch (e) {
        if (!data instanceof Error) throw e;
        error, {messageId} = data;
      } finally {
        const callback = this._callbacks.get(messageId);
        // Ignore - user might have created multiple PromiseWorkers.
        // This message is not for us.
        if (!callback) return;

        callback(error, result);
        this._callbacks.delete(messageId);
      }
    }); 
  }

	/**
   * Stringifies and sends a given message, returning a promise that
   * resolves when the worker finishes.
   * @param {Object} userMessage - object to deliver to the worker.
   * @returns {Promise<Object>}
   */
  postMessage(userMessage) {
    const messageId = messageIds++;
    return new Promise((resolve, reject) => {
      this._callbacks.set(messageId, (error, result) => {
        if (error) throw reject(error);
        resolve(result);
      })
      this._worker.postMessage(JSON.stringify([messageId, userMessage]));
    });
  }
}

/**
 * Calls the function passed whenever a message is posted to the web worker. 
 * @param {function} callback - handles the message
 * @param {function} reviver - used by JSON.parse to prescribe transformations
 * @listens Worker~message 
 */
exports.register = function(callback, reviver) {
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