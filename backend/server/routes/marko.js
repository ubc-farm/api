import * as path from 'path';

function handler(request, reply) {
	let {dir, name, ext} = path.posix.parse(request.path);
	const filePath = path.format({dir, name, ext: '.marko'})
	if (ext === '') { //path to a directory (no extension is specified)
		//check if filename.marko exists, otherwise use filename/index.marko
		exists(filePath).then(doesExist => {
			if (doesExist) {
				return reply.view(filePath);
			} else {
				return reply.view(path.join(dir, name, 'index.marko'));
			}
		})
	} else return reply.view(filePath);
}

/** Routes for marko views */
const routes = [
	{
		method: 'GET',
		path: '/fields/edit/{clientParams*}',
		handler
	}
];
export default routes;