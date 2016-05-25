const querystring = require('querystring');
const src = 'https://maps.googleapis.com/maps/api/js';
const {GOOGLE_TOKEN: key} = process.env;

/**
 * Creates a google maps API link
 * @param {string|string[]} [input.libraries] - list of libraries to use
 */
module.exports = function(...libraries) {
	let q = {};
	
	if (key) q.key = key;
	if (libraries) {
		if (!Array.isArray(libraries)) libraries = [libraries];

		q.libraries = libraries.join(',')
	}

	return `${src}?${querystring.stringify(q)}`;
}