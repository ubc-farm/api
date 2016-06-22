import {posix as path, normalize} from 'path';
import exists from '../exists.js';
import Promise from 'bluebird';

/**
 * Helper function that searches for the correct file to serve before
 * replying. 
 * @param {Request} request
 * @param {Reply} reply
 * @param {string} extension
 * @param {Object} [data] passed to the view, along with request.params
 * @returns {Promise<Response>}
 */
export default function search(request, reply, extension = '.html', data = {}) {
	const req = path.parse(request.path);
	//substr to remove leading '/'
	const dir = path.join(req.dir, req.name).substr(1); 
	const file = dir + extension;
	data = Object.assign(data, request.params);
	
	if (req.ext === '') { //path to a directory (no extension is specified)
		//check if filename.ext exists, otherwise use filename/index.ext
		console.log(file); console.log(__dirname);
		return exists(normalize(__dirname + '/../../../views/' + file))
		.then(doesExist => {
			if (doesExist) {
				return reply.view(file, data);
			} else {
				return reply.view(`${dir}/index${extension}`, data);
			}
		})
	} 
	else return Promise.resolve( reply.view(request.path, data) );
}