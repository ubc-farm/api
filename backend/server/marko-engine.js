const marko = require('marko');
const exists = require('./exists.js').default;

/**
 * Async view engine for Vision. 
 * @param {string} src - template text (currently not used)
 * @param {function} next - callback for async view engines
 */
function compile(src, {filename, removeCache}, next) {
	let template = marko.load(filename, src);
	next(null, (data, options, callback) => {
		template.render(data, callback);
	})
}
module.exports = {compile};