import {rollup} from 'rollup';
import {join} from 'path';

/**
 * Automatically bundles code using rollup for the browser
 * @param {Object} route
 * @param {string} route.method - must be GET
 * @param {string} route.settings.files.relativeTo - set via server.path(), 
 * lists the path that all the module entry points are relative to.
 * 
 * @param {Object} options - mostly sameas rollup config
 * @param {boolean} [options.sourceMap] - appends sourceMap to code if true
 * @param {string} options.moduleName - needed for the default 
 * IIFE module format
 * 
 * @param {boolean} [options.regenerate=true] for testing, recreate
 * the rollup on each request
 * @param {string} [options.mime='application/javascript']
 */
export default function(route, options) {
	if (route.method.toLowerCase() !== 'get') {
		throw TypeError('This handler can only be used for routes with a ' + 
			'GET method. ' + route.method + ' is not supported.');
	}
	
	var cache;
	if (options.cache) cache = options.cache;
	const entry = join(route.settings.files.relativeTo, options.entry);
	const config = Object.assign({}, options, {cache, entry});

	const {regenerate = (process.env.NODE_ENV === 'development')} = options; 
	let parentRoll;
	if (!regenerate) parentRoll = rollup(config);

	const {format = 'iife'} = options;
	const bunConfig = Object.assign({}, options, {format});

	const {mime = 'application/javascript'} = options;

	return function(request, reply) {
		let roll;
		if (regenerate) roll = rollup(config);
		else roll = parentRoll;

		const bundle = roll.then(bundle => bundle.generate(bunConfig));
		const code = bundle.then(({code, map}) => {
			if (map) code += '\n//#sourceMappingURL=' + map.toUrl();
			return code;
		});

		return reply(code).type(mime)
	}
}