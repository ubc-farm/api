/**
 * Creates a 2D array of the given month
 * @module shared/calendar/array
 * @param {integer} value - date expressed in milliseconds
 * @returns {number[][]} 2D array resembling calendar (blank slots contain null)
 */
export default function calendarArray(value = Date.now()) {
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