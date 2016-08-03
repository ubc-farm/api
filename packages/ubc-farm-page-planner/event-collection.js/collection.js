import findClosestIndex from './search.js';

export default class EventCollection extends Array {
	constructor(iterable) {
		super();
		this.splice(0, 0, ...iterable);
	}

	withinRange(from, to = from) {
		let start = findClosestIndex(b => b.from - from, this);
		let end = findClosestIndex(b => b.to - to, this);

		start = Math.max(start - 1, 0); end = Math.min(end + 1, this.length -1);
		return this.slice(start, end);
	}
}