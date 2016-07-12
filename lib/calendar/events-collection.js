import Event from './event.js'
import {equal} from './compare.js';

export default class EventCollection extends Array {
	constructor() {
		super();
	}

	*search(date, fidelity = 7) {
		let start = 0, end = this.length;
		while (true) {
			const pivot = parseInt(start + (end - start) / 2, 10);
			if (end - start <= 1) return {exact: false, pivot};
			else if (equal(this[pivot], date, fidelity)) return {exact: true, pivot};
			else if (this[pivot] < date) {
				start = pivot;
				yield this[pivot];
				continue;
			} else {
				end = pivot;
				yield this[pivot]; 
				continue;
			}
		}
	}

	locationOf(date, fidelity) {
		const searcher = this.search(date, fidelity);
		while (true) {
			const {done, value} = searcher.next(); 
			if (done) return value.pivot;
		}
	}

	add(event) {
		if (!Event.isEvent(event)) return false;
		return this.slice().splice(this.locationOf(event.start) + 1, 0, event);
	}

	has(date, fidelity = 3) {
		const searcher = this.search(date, fidelity);
		while (true) {
			const {done, value} = searcher.next(); 
			if (done) return value.exact;
		}
	}

	/** @todo */
	*get(date) {}
}