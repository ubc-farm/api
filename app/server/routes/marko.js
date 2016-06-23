import {search} from '../../lib/folder';

/**
 * Handler for marko files that rewrites their filenames
 */
function handler(request, reply) {
	search(request.path, '.marko').then(path => reply.view(path))
}

/** Routes for marko views */
const routes = [
	{
		method: 'GET',
		path: '/fields/edit/{clientParams*}',
		handler
	},
	{
		method: 'GET',
		path: '/fields/{fieldID?}',
		handler
	},
	{
		method: 'GET',
		path: '/events/{task?}',
		handler
	},
	{
		method: 'GET',
		path: '/finances/{page*}',
		handler
	},
];
export default routes;