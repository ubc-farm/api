import {search} from 'lib/folder';

/**
 * Handler for marko files that rewrites their filenames
 */
function handler(request, reply) {
	search(request.path, '.js', process.env.WORKSPACE_ROOT + '/views')
		.then(path => reply.view(path, {
			active: 'Planning'
		}))
}

/** Routes for marko views */
const routes = [
	{
		method: 'GET',
		path: '/planning/database',
		handler: (request, reply) => {
			return search(request.path, '.js', process.env.WORKSPACE_ROOT + '/views')
			.then(path => reply.view(path, {
				active: 'Planning',
				title: 'Item Database'
			}));
		}
	} 
];
export default routes;