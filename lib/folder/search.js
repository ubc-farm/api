import {posix, join, format} from 'path';
import exists from './exists.js';
import Promise from 'bluebird';

/**
 * Helper function that searches for the correct file to serve before
 * replying. Checks if requestPath.ext exists, otherwise uses
 * requestPath/index.ext
 * @param {string} requestPath - URL path 
 * @param {string} ext - extension to test with
 * @param {string} searchFolder - folder to search inside
 * @returns {Promise<string>}
 */
export default function search(requestPath, ext = '.html', searchFolder) {
	const {dir = '', name = '', ext: hasExt = ''} = posix.parse(requestPath);

	let pathWithoutExt = format({dir, name, root: ''});
	if (pathWithoutExt.startsWith('/')) 
		pathWithoutExt = pathWithoutExt.substr(1); 
	const pathWithCustomExt = pathWithoutExt + ext;
	
	if (hasExt) {
		return exists(join(searchFolder, requestPath)).then(fileExists => {
			if (fileExists) return requestPath;
			else throw Error(`${requestPath} does not exist`);
		})
	} else { 
		return exists(join(searchFolder, pathWithCustomExt))
		.then(customExtFileExists => {
			if (customExtFileExists) 
				return pathWithCustomExt;

			else {
				const indexPath = format({
					dir: pathWithoutExt, 
					name: 'index', 
					ext
				});

				return exists(join(searchFolder, indexPath)).then(indexExists => {
					if (indexExists) return indexPath;
					else throw Error(`${pathWithCustomExt} and ${indexPath} do not exist`)
				})
			}
		});
	}
}