function stripGetSet(name) {
	if (name.length < 4) return name;
	if (name.startsWith('get') || name.startsWith('set')) 
		return name.charAt(3).toLowerCase() + name.substr(4);
}

function filterToBuckets(array, callback) {
	return array.reduce((buckets, value, index, array) => {
		const [bucket, result] = callback(value, index, array);
		if (!buckets[bucket]) buckets[bucket] = [];
		if (result) buckets[bucket].push(value);
		return bucket;
	}, {})
}

function createPrototypeBuckets(someClassProto, ignoreMethods = []) {
	return filterToBuckets(Object.keys(someClassProto), 
		(method, i, arr) => {
			if (method.startsWith('get')) {
				const stripped = stripGetSet(method);
				if (arr.includes('set' + method.substr(3))) return ['getset', stripped];
				else return ['getonly', stripped];
			} else if (method.startsWith('set')) {
				if (!arr.includes('get' + method.substr(3))) 
					return ['setonly', stripGetSet(method)];
			} else if (ignoreMethods === false) {
				return ['other', method]
			}
		}
	)
}

export default function enhancer(
	someClass, convertMethods = [], 
	dictionary = new WeakMap()
) {
	const proto = someClass.prototype;
	const {getonly, setonly, getset, other} = 
		reatePrototypeBuckets(proto, convertMethods);
	let descriptors = {}, methods = {};
	for (let dualMethodName of getset) {
		const setMethod = 'set' + dualMethodName.charAt(0).toUpperCase() 
			+ dualMethodName.substr(1);
		const getMethod = 'get' + dualMethodName.charAt(0).toUpperCase() 
			+ dualMethodName.substr(1);
		descriptors[dualMethodName] = {
			get: () => convert( proto[getMethod]() , dictionary),
			set: value => convert( proto[setMethod](value) , dictionary)
		};
	}
	for (let getname of getonly) {
		const getMethod = 'get' + getname.charAt(0).toUpperCase() 
			+ getname.substr(1);
		descriptors[getname] = {
			get: () => convert( proto[getMethod]() , dictionary)
		};
	}
	for (let setname of setonly) {
		const setMethod = 'get' + setname.charAt(0).toUpperCase() 
			+ setname.substr(1);
		descriptors[setname] = {
			set: value => convert( proto[setMethod](value) , dictionary)
		};
	}
	for (let othername of convertMethods || other) {
		methods[othername] = 
			(...args) => convert( proto[othername](...args) , dictionary);
	}

	Object.defineProperties(someClass.prototype, descriptors);
	Object.assign(someClass.prototype, methods);
}

export function convert(value, dictionary) {
	const converter = dictionary.get(value.prototype);
	if (converter === undefined) return value;
	else return converter(value);
}