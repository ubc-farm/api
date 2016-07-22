/**
 * Returns a date string containing year, month, and date.
 * @param {Date} date
 * @returns {string} in format YYYY-MM-DD
 * @example
 * const date = new Date(1969, 07, 16);
 * toIsoDate(date) // returns 1969-07-16
 */
export function toRfcDate(date) {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}