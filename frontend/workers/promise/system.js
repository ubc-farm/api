import {Deferred} from 'utils.js';
import {PromiseWorker} from 'worker/promise/main.js';

export default class ModuleWorker extends PromiseWorker {
	constructor(file) {
		super('/js/worker/promise/system-worker.js');
		this.ready = new Deferred();
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