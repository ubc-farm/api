import {search} from 'lib/folder';

export default function viewHandler(route, options) {
	const {relativeTo, path, initialState, type} = options;

	let extension;
	switch (type) {
		case 'react': extension = '.js'; break;
		case 'marko': extension = '.marko'; break;
		default: extension = '.' + type; break;
	}
	
	if (path) {
		return function(request, reply) {
			return reply.view(path, initialState)
		}
	} else {
		return function(request, reply) {
			return search(request.path, extension, relativeTo)
				.then(path => reply.view(path, initialState))
		}
	}
}