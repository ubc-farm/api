import {Deferred} from 'utils.js';
import {PromiseWorker} from 'worker/promise/main.js';

export default class ModuleWorker extends PromiseWorker {
	constructor(file) {
		super('/js/worker/promise/system-worker.js');
		this.ready = new Deferred();
		var ready = e => {
			e.stopPropagation();
			this.ready.resolve();
			this.removeEventListener('message', ready, true);
		}
		this.addEventListener('message', ready, true);
		super.postMessage(file);
	}
	
	postMessage(userMessage) {
		this.ready.then(() => { super.postMessage(userMessage); })
	}
}