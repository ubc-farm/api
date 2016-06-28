import {search} from 'lib/folder';

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
		handler: (req, rep) => {
			return search(req, rep, '.js', {
				active: 'Planning',
				title: 'Test Page'
			})
		}
	},
	{
		method: 'GET',
		path: '/planning/database',
		handler: (req, rep) => {
			return search(req, rep, '.js', {
				active: 'Planning',
				title: 'Item Database'
			})
		}
	} 
];
export default routes;