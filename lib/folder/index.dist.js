/**
 * @module lib/folder
 */

const Promise = require('bluebird');
const stat = Promise.promisify(require('fs').stat);

/**
 * Function to check if a file exists via fs.stat
 * @param {string} path to check
 * @returns {Promise<boolean>} true if the file exists, false otherwise
 */
const exists = exports.exists = path => stat(path)
	// Non-standard Bluebird promise catcher
	// Equivalent code would be an if function that re-throws the error if it 
	// isn't an ENOENT error.
	.catch({code: 'ENOENT'}, () => false) 
	// Normally stat returns a fs.Stats object, but if the catch activated then
	// it returns false instead
	.then(stats => stats !== false);

const {posix, join, format} = require('path');

/**
 * Helper function that searches for the correct file to serve before
 * replying. Checks if requestPath.ext exists, otherwise uses
 * requestPath/index.ext
 * @param {string} requestPath - URL path 
 * @param {string} ext - extension to test with
 * @param {string} searchFolder - folder to search inside
 * @returns {Promise<string>}
 */
exports.search = function(requestPath, ext = '.html', searchFolder) {
	const {dir = '', name = '', ext: hasExt = ''} = posix.parse(requestPath);

	let pathWithoutExt = format({dir, name, root: ''});
	if (pathWithoutExt.startsWith('/')) 
		pathWithoutExt = pathWithoutExt.substr(1); 
	const pathWithCustomExt = pathWithoutExt + ext;
	
	if (hasExt) {
		const normalized = format({dir, name, ext: hasExt});
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