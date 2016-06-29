import {posix as path, resolve} from 'path';
import exists from './exists.js';
import Promise from 'bluebird';

/**
 * Helper function that searches for the correct file to serve before
 * replying. 
 * @param {string} path
 * @param {string} extension
 * @returns {Promise<string>}
 */
export default function search(searchPath, extension = '.html', searchDir) {
	const req = path.parse(searchPath);
	//substr to remove leading '/'
	let dir = path.join(req.dir, req.name);
	if (dir.startsWith('/')) dir = dir.substr(1); 
	const file = dir + extension;
	
	if (req.ext === '') { //path to a directory (no extension is specified)
		//check if filename.ext exists, otherwise use filename/index.ext
		return exists(resolve(searchDir, file))
		.then(doesExist => {
			if (doesExist) return file;
			else return `./${dir}/index${extension}`;
		});
	} 
	else return Promise.resolve(resolve(searchDir, file));
}