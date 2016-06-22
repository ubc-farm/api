import search from './search.js';

/**
 * Handler for marko files that rewrites their filenames
 */
function handler(request, reply) {
	search(request, reply, '.js');
}

/** Routes for marko views */
const routes = [
	{
		method: 'GET',
		path: '/test',
		handler
	}
];
export default routes;