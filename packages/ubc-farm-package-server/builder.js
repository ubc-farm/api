import {join} from 'path';
import {rollup} from 'rollup';
import {wrap} from 'boom';

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
	
	var cache; if (options.cache) cache = options.cache;
	const entry = join(route.settings.files.relativeTo, options.entry);
	const config = Object.assign({}, options, {cache, entry});

	let roll = rollup(config);

	const {format = 'iife', mime = 'application/javascript'} = options;
	const bunConfig = Object.assign({}, options, {format});

	return function(request, reply) {
		const bundle = roll.then(bundle => bundle.generate(bunConfig));
		const code = bundle.then(({code, map}) => {
			if (map) code += '\n//#sourceMappingURL=' + map.toUrl();
			return code;
		}).catch(err => {
			const boom = wrap(err, 501, 'Error when compling code');
			console.error(boom.message);
			return boom;
		})

		return reply(code).type(mime)
	}
}