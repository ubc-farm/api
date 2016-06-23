/**
 * Fork of https://github.com/JedWatson/classnames/blob/master/index.js
 * Slight ES6 adjustments
 */

const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
export default function classList(...classes) {
	let list = [];
	for (let classname of classes) {
		if (!classname) continue; //skip falsy values
		
		const type = typeof classname;
		if (type === 'string' || type === 'number') 
			list.push(classname);
		else if (Array.isArray(classname)) 
			list.push( classList(...classname) );
		else if (type === 'object') {
			for (let key in classname) 
				if (has(classname, key) && classname[key]) list.push(key);
		}
	}
	return list.join(' ');
}