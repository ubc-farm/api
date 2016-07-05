/**
 * Transforms a string such as getThing or setThing to thing.
 * If the string doesn't begin with get or set, an empty string is returned.
 * @param {string} name
 * @returns {string} stripped name
 */
export function stripGetSet(name) {
	if (name.startsWith('get') || name.startsWith('set')) 
		return name.charAt(3).toLowerCase() + name.substr(4);
	else return '';
}

/**
 * Adds getter and setter methods only a class' prototype
 * @param {any} someClass
 */
export default function enhancer(someClass) {
	const proto = someClass.prototype;

	let descriptors = {};
	for (let method of Object.keys(proto)) {
		if (method.length < 4) continue;

		const stripped = stripGetSet(method);
		if (stripped && descriptors[stripped] === undefined) 
			descriptors[stripped] = {};

		if (method.startsWith('get'))
			descriptors[stripped].get = proto[method];
		else if (method.startsWith('set'))
			descriptors[stripped].set = proto[method];
	}

	Object.defineProperties(someClass.prototype, descriptors);
}