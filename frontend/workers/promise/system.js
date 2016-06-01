import {Deferred} from 'utils.js';
import {PromiseWorker} from 'worker/promise/main.js';

export default class ModuleWorker extends PromiseWorker {
	constructor(file) {
		this.ready = new Deferred();
		super('/js/worker/promise/system-worker.js');
		let ready = e => {
			e.stopPropagation();
			this.ready.resolve();
		}
		this.addEventListener('message', e => {
			e.stopPropagation();
		}, true);
		this.postMessage(file);
	}
}