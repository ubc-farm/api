import {Deferred} from 'utils.js';
import PromiseWorker from 'workers/promise/main.js';

/**
 * Web Worker that lets you use ES6 modules via
 * SystemJS. This extends Promise Worker by loading
 * a middleman file (system-worker.js), which then
 * opens the file you passed to the constructor.
 * Because of this, you can only pass URLs, not
 * existing Workers.
 * @module workers/promise/system.js
 * @extends PromiseWorker
 */
export default class ModuleWorker extends PromiseWorker {
	/**
	 * @param {string} url to file 
	 */
	constructor(file) {
		console.log('system', file);
		super('/js/vendor/system-worker.js');
		
		this.ready = new Deferred();
		var ready = e => {
			e.stopPropagation();
			this.ready.resolve();
			this._worker.removeEventListener('message', ready, true);
		}
		this._worker.addEventListener('message', ready, true);

		super.postMessage(file);
		return this;
	}
	
	/**
	 * Post a message to the worker.
	 * @returns {Promise} promise that resolves when reigster returns a value.
	 */
	postMessage(userMessage) {
		return this.ready.promise.then(() => super.postMessage(userMessage));
	}
}