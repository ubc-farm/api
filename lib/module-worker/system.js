import PromiseWorker from 'promise-worker/main';

/**
 * Web Worker that lets you use ES6 modules via SystemJS. This extends 
 * PromiseWorker by loading a middleman file (system-worker.js), which 
 * then opens the module file you passed to the constructor. Because of this,
 * you can only pass URLs, not existing Workers.
 * @module frontend/workers/promise/system
 * @extends PromiseWorker
 */
export default class ModuleWorker extends PromiseWorker {
	/**
	 * @param {string} url to file 
	 */
	constructor(file) {
		super('/js/workers/system-worker.js');

		this.readyState = new Promise((resolve, reject) => {
			const worker = this._worker;
			function moduleReady(event) {
				event.stopPropagation(); resolve();
				worker.removeEventListener('message', moduleReady, true);
			}
			worker.addEventListener('message', moduleReady, true);
		})

		super.postMessage(file);
		return this;
	}
	
	/**
	 * Post a message to the worker.
	 * @returns {Promise} promise that resolves when reigster returns a value.
	 */
	postMessage(userMessage) {
		return this.readyState.then(() => super.postMessage(userMessage));
	}
}

//export {default as register} from './register.js';