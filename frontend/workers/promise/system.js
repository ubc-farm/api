import {Deferred} from 'utils.js';
import PromiseWorker from 'workers/promise/main.js';

export default class ModuleWorker extends PromiseWorker {
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
	
	postMessage(userMessage) {
		return this.ready.then(() => super.postMessage(userMessage))
	}
}