import {search} from '../../lib/folder';

/**
 * Handler for marko files that rewrites their filenames
 */
function handler(request, reply) {
	search(request.path, '.js').then(path => reply.view(path, {
		active: 'Planning'
	}))
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