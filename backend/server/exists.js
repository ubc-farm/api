import Promise from 'bluebird';
import {stat as fsStat} from 'fs';
const stat = Promise.promisify(fsStat);

/**
 * Function to check if a file exists via fs.stat
 * @param {string} path to check
 * @returns {Promise<boolean>} true if the file exists, false otherwise
 */
export default function exists(path) {
	return stat(path)
		// Non-standard Bluebird promise catcher
		// Equivalent code would be an if function that re-throws the error if it 
		// isn't an ENOENT error.
		.catch({code: 'ENOENT'}, () => false) 
		// Normally stat returns a fs.Stats object, but if the catch activated then
		// it returns null instead
		.then(stats => stats !== false) 
}