function stripGetSet(name) {
	if (name.length < 4) return name;
	if (name.startsWith('get') || name.startsWith('set')) 
		return name.charAt(3).toLowerCase() + name.substr(4);
}

function flagProtoMethods(proto) {
	const getonly = {get: true, set: false};
	const setonly = {set: true, get: false};
	const getset = {get: true, set: true};

	const methods = Object.keys(proto);
	let result = new Map();
	for (let method of methods) {
		const stripped = stripGetSet(method);
		if (method.startsWith('get')) {
			if (arr.includes('set' + method.substr(3))) 
				result.set(stripped, getset);
			else result.set(stripped, getonly);
		} 
		else if (method.startsWith('set')) {
			if (!arr.includes('get' + method.substr(3))) 
				result.set(stripped, setonly);
		} 
	}	
}

function createDescriptor(methodName, proto, options = {}) {
	const {get, set} = options;
	const suffix = 
		methodName.charAt(0).toUpperCase() 
		+ methodName.substr(1);
	let descriptor = {};
	if (get) descriptor.get = proto['get' + suffix];
	if (set) descriptor.set = proto['set' + suffix];
	return descriptor;
}

export default function enhancer(someClass) {
	const proto = someClass.prototype;
	const flags = flagProtoMethods(proto);
	let descriptors = {};
	flags.forEach((settings, method) => descriptors[method] =
		createDescriptor(method, proto, settings));
	Object.defineProperties(someClass.prototype, descriptors);
}