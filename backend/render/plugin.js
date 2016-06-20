import {get} from './marko.js';
import path from 'path';

function handler(route, config) {
	const path = route.path;
	let {data = {}, refresh = false} = config;

	return function handler(request, reply) {
		const rPath = (typeof path === 'function' ? path(request) : path);
		let stream = get(rPath, refresh).stream(data)
		return reply(stream);
	}
}

/**
 * @param {Server} server the plugin is being registered to
 * @param {Object} options from registration
 * @param {function} next returns control back to framework
 */
export function register(server, options, next) {
	Object.assign(settings, options);
	server.handler('marko', handler);
	return next();
}
marko.attributes = {
	name: 'marko',
	connections: false,
	once: true
}
export default register;