export default class Event {
	constructor(from = new Date(), to, details) {
		if (details === undefined && !to instanceof Date) to = details;
		Object.assign(this, {from, to, details: details || {}});
	}

	static isEvent(maybeEvent) {
		return typeof maybeEvent === 'object'
		&& maybeEvent.from instanceof Date
		&& maybeEvent.to instanceof Date
		&& typeof maybeEvent.details === 'object'
	}

	static isPoint(event) {
		return event.from === event.to;
	}

	/**
	 * Checks if a date falls between the to and from properties on this object
	 */
	containsDate(date) {
		return date >= this.from && date <= this.to;
	}
}