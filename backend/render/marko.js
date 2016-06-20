const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const marko = require('marko');

/**
 * Check if file exists
 * @returns {Promise<boolean>}
 */
export function exists(path) {
	return fs.statAsync(path)
		.then(() => true)
		.catch(err => {
			if (err.code == 'ENOENT')
				return false; //file doesn't exist
			else
				throw err; //some other error
		})
}

/**
 * @returns {Template} the marko template
 * @see http://markojs.com/docs/marko/javascript-api/#template-1
 */
export function get(path, fresh) {
	const endJs = path.endsWith('.marko.js');
	const endMarko = path.endsWith('.marko');
	let templateComplied;
	if (endJs) {
		let resPath = require.resolve(path);
		if (fresh) 
			delete require.cache[resPath];
		return require(resPath);
	} else if (endMarko) {
		console.warn('Templates should be pre-complied');
		return marko.load(path);
	}
}