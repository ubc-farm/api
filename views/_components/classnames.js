/**
 * Fork of https://github.com/JedWatson/classnames/blob/master/index.js
 * Slight ES6 adjustments
 */

const hasOwn = {}.hasOwnProperty;
export default function classList(...classes) {
	let list = [];
	for (let classname of classes) {
		if (!classname) continue; //skip falsy values
		
		const type = typeof classname;
		if (type === 'string' || type === 'number') {
			list.push(classname);
		} else if (Array.isArray(classname)) {
			list.push( classList(...classname) );
		} else if (type === 'object') {
			for (let key in classname) {
				if (hasOwn.call(classname, key) && classname[key]) {
					list.push(key);
				}
			}
		}
	}
	return list.join(' ');
}