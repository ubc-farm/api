const querystring = require('querystring');
const src = 'https://maps.googleapis.com/maps/api/js';
const {GOOGLE_TOKEN: key} = process.env;

/**
 * Creates a google maps API link
 * @param {string} [input.libraries] - list of libraries to use
 */
module.exports = function(...libraries) {
	let keyS = '', library = '';
	
	if (key) keyS = `key=${key}&`;
	if (libraries.length > 0) {library = `libraries=${libraries.join(',')}`}

	return src + '?' + keyS + library;
}