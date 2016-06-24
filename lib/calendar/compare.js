/**
 * Enum for date fidelity levels
 * @enum
 */
export const fidelity = {
	YEAR: 1,
	MONTH: 2,
	DAY: 3,
	HOUR: 4,
	MINUTE: 5,
	SECOND: 6,
	MILLISECOND: 7
}

/**
 * Compares two dates and returns an object with boolean values
 * @param {Date} date1
 * @param {Date} date2
 * @param {number} fidelity - how exact to check the dates
 * @returns {Object}
 */
export function compare(date1, date2, fidelity = 3) {
	if (fidelity < 0 || fidelity > 7)
		throw TypeError('fidelity must be between 0-7');
	
	const compare = (func) => func.call(date1) === func.call(date2);
	
	let c = {};
	if (fidelity >= 1) c.year = compare(getFullYear);
	if (fidelity >= 2) c.month = compare(getMonth);
	if (fidelity >= 3) c.day = compare(getDate);
	if (fidelity >= 4) c.hour = compare(getHours);
	if (fidelity >= 5) c.minute = compare(getMinutes);
	if (fidelity >= 6) c.second = compare(getSeconds);
	if (fidelity == 7) c.millisecond = compare(getMilliseconds)

	return c;
}

/**
 * Checks if two dates are equal up to the given fidelity.
 * Higher fidelity will cause the dates to be checked in greater detail
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
export function equal(date1, date2, fidelity) {
	let bool = true;
	for (let state in compare(date1, date2, fidelity)) bool = bool && state;
	return bool;
}

/**
 * Checks if both dates are in the same half of a day in a 12-hour clock.
 * Only the time is considered; differences in the year/month/date are ignored
 * @param {Date} date1
 * @param {Date} date2 
 * @returns {string} '' if false, or either 'AM' or 'PM' 
 */
export function sameHalf(date1, date2) {
	const m1 = date1.getHours() < 12 ? 'AM' : 'PM', 
	      m2 = date2.getHours() < 12 ? 'AM' : 'PM';
	if (m1 === m2) return m1;
	else return '';
}