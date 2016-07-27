import {posix, join, format} from 'path';
import exists from './exists.js';

/**
 * Helper function that searches for the correct file to serve before
 * replying. Checks if requestPath.ext exists, otherwise uses
 * requestPath/index.ext
 * @param {string} requestPath - URL path 
 * @param {string} ext - extension to test with
 * @param {string} searchFolder - folder to search inside
 * @returns {Promise<string>}
 * @alias module:lib/folder.search
 */
export default function search(requestPath, ext = '.html', searchFolder) {
	const {dir = '', name = '', ext: hasExt = ''} = posix.parse(requestPath);

	let pathWithoutExt = format({dir, name, root: ''});
	if (pathWithoutExt.startsWith('/')) 
		pathWithoutExt = pathWithoutExt.substr(1); 
	const pathWithCustomExt = pathWithoutExt + ext;
	
	if (hasExt) {
		let normalized = format({dir, name, ext: hasExt});
		if (normalized.startsWith('/')) normalized = normalized.substr(1);
		
		return exists(join(searchFolder, normalized)).then(fileExists => {
			if (fileExists) return normalized;
			else throw Error(`${normalized} does not exist`);
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