/**
 * @module lib/calendar
 */

const label = exports.label = {
	/**
	 * @type {Object}
	 * @property {string[]} months
	 * @property {string[]} weeks
	 */
	long: {
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
			'August', 'September', 'October', 'November', 'December'],
		weeks: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday']
	},
	/**
	 * @type {Object}
	 * @property {string[]} months
	 * @property {string[]} weeks
	 */
	short: {
		months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
			'Oct', 'Nov', 'Dec'],
		weeks: ['Sun', 'Mon', 'Tue',	'Wed', 'Thu', 'Fri', 'Sat']
	}
};
const {months} = label.long; const shortMonths = label.short.months;

/**
 * Creates a 2D array of the given month
 * @param {integer} value - date expressed in milliseconds
 * @returns {number[][]} 2D array resembling calendar (blank slots contain null)
 */
exports.asArray = function(value = Date.now()) {
	const d = new Date(value);
	let dateObj = new Date(d.getFullYear(), d.getMonth() + 1, 0); 
	const maxDays = dateObj.getDate();
	
	let calendar = [
		Array(7).fill(null), 
		Array(7).fill(null),
		Array(7).fill(null),
		Array(7).fill(null),
		Array(7).fill(null),
		Array(7).fill(null)
	]
	
	let week = 0;
	for (let date = 1; date <= maxDays; date++) {
		dateObj.setDate(date);
		let day = dateObj.getDay();
		calendar[week][day] = date;
		if (day === 6) week += 1;
	}
	
	return calendar;
}

/**
 * Used to render a time. You can either pass in a date object or pass in
 * a time string in format HHMM (such as 1300 for 13 o'clock / 1 pm).
 * @param {Date|string} date object or a string
 * @param {boolean} [amPm=true] - set to false to prevent AM/PM from showing
 * @param {boolean} [trailing=false] - set to false to truncate hours, 
 * i.e.: 12:00 becomes 12 instead. 
 * @param {boolean} [twelve=true] - true to use 12 hours clock, false to use 24
 * @returns {string}
 */
const toTimeString = exports.toTimeString = function(date, options = {}) {
	const {amPm = true, trailing = false, twelve = true} = options;

	if (typeof date === 'string') {
		const time = date.toString();
		let hr = 0, min = parseInt(time.slice(-2));
		if (time.length > 2) hr = parseInt(time.slice(0, -2));

		date = new Date(0);
		date.setHours(hr, min);
	} else if (date == null) {
		return '';
	}

	let hour = date.getHours(), minute = date.getMinutes(), amPmStr = '';
	if (twelve) {
		if (hour === 0) {
			hour = 12;
			if (amPm) amPmStr = ' AM';
		} else if (amPm && hour === 12) {
			amPmStr = ' PM';
		} else if (hour > 12) {
			hour = hour % 12;
			if (amPm) amPmStr = ' PM';
		} else if (amPm) { amPmStr = ' AM'; }
	}
	
	let minString = ':' + minute.toString();
	if (trailing && minute === 0) { minString = '';	}

	return hour.toString() + minString + amPmStr;
}

/**
 * Used to render a date. You can pass a Date object or an object with the 
 * correct properties.
 * @param {Date|Object} date object or json object
 * @param {number} date.date
 * @param {number} date.month
 * @param {number} date.year
 * @param {boolean} [showYear=false] - wheter or not to display the year
 * @param {boolean} [shortMonth=true] - wheter or not to shorten the month
 * @returns {string}
 */
const toDateString = exports.toDateString = function(date, options = {}) {
	const {showYear = false, shortMonth = true} = options;

	if (!date instanceof Date) {
		date = new Date(date.year, date.month, date.date);
	}

	let yearString = '';
	if (showYear) yearString = ' ' + date.getFullYear().toString(); 

	const month = shortMonth 
	 ? shortMonths[date.getMonth()] 
	 : months[date.getMonth()];
	return date.getDate().toString() + ' ' + month + yearString;
}

/**
 * Enum for date fidelity levels
 * @enum
 */
const fidelity = exports.fidelity = {
	YEAR: 1,
	MONTH: 2,
	DAY: 3,
	HOUR: 4,
	MINUTE: 5,
	SECOND: 6,
	MILLISECOND: 7
}, f = fidelity;

/**
 * Compares two dates and returns an object with boolean values
 * @param {Date} date1
 * @param {Date} date2
 * @param {number} fidelity - how exact to check the dates
 * @returns {Object}
 */
exports.compare = function(date1, date2, fidelity = 3) {
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
const equal = exports.equal = function(date1, date2, fidelity) {
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
const sameHalf = exports.sameHalf = function sameHalf(date1, date2) {
	const m1 = date1.getHours() < 12 ? 'AM' : 'PM', 
	      m2 = date2.getHours() < 12 ? 'AM' : 'PM';
	if (m1 === m2) return m1;
	else return '';
}

/**
 * Returns a string representing a human-readable time
 * @param {Date} start
 * @param {Date} end
 * @param {Object} [opts]
 * @param {boolean} [opts.forceDate]
 * @param {boolean} [opts.twelveHour]
 * @returns {Object} 
 */
exports.toRangeString = function RangeString(start, end, opts = {}) {
	if (start == null && end == null) 
		throw TypeError('start and end are required parameters');
	const {forceDate, twelveHour: twelve} = opts;
	const sameDay = equal(start, end, f.DAY);
	const eqHalf = sameHalf(start, end);

	// Hide the date
	if (sameDay && !forceDate) {
		return [
			{
				utc: start.toUTCString(),
				text: [toTimeString(start, {amPm: !eqHalf, twelve})]
			},
			{
				utc: end.toUTCString(),
				text: [toTimeString(end, {amPm: true, twelve})]
			}
		];
	}
	// Same date, but show it anyways
	else if (sameDay && forceDate) {
		return [
			{
				utc: start.toUTCString(),
				text: [
					toDateString(start, {shortMonth: false}),
					toTimeString(start, {amPm: !eqHalf, twelve})
				]
			},
			{
				utc: end.toUTCString(),
				text: [toTimeString(end, {amPm: true, twelve})]
			}
		];
	}
	// Different dates
	else {
		return [
			{
				utc: start.toUTCString(),
				text: [
					toDateString(start, {shortMonth: true}),
					toTimeString(start, {amPm: true, twelve})
				]
			},
			{
				utc: end.toUTCString(),
				text: [
					toDateString(end, {shortMonth: true}),
					toTimeString(end, {amPm: true, twelve})
				]
			}
		];
	}
}