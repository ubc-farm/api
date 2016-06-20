import * as path from 'path';

/**
 * Handler for marko files that rewrites their filenames
 */
function handler(request, reply) {
	let {dir, name, ext} = path.posix.parse(request.path);
	const filePath = path.format({dir, name, ext: '.marko'})
	if (ext === '') { //path to a directory (no extension is specified)
		//check if filename.marko exists, otherwise use filename/index.marko
		exists(filePath).then(doesExist => {
			if (doesExist) {
				return reply.view(filePath, request.params);
			} else {
				return reply.view(path.join(dir, name, 'index.marko'), request.params);
			}
		})
	} else return reply.view(filePath, request.params);
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