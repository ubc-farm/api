const src = 'https://maps.googleapis.com/maps/api/js';
const {GOOGLE_TOKEN: key=''} = process.env;

/**
 * Creates a google maps API link
 * @param {string|string[]} [input.libraries] - list of libraries to use
 */
module.exports = function(libraries) {
	let library = '';
	if (libraries) {
		if (!Array.isArray(libraries)) libraries = [libraries];
		library = `&libraries=${libraries.join(',')}`;
	}
	
	return `"${src}?key=${key}${library}"`;
}