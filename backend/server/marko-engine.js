const marko = require('marko');
const path = require('path');
const exists = require('./exists.js').default;

/**
 * Async view engine for Vision. 
 * @param {string} src - template text (currently not used)
 * @param {function} next - callback for async view engines
 */
function compile(src, {filename, removeCache}, next) {
	let path = require.resolve(filename);
	if (removeCache) delete require.cache[path];
	
	let template = require(path);
	next(null, (data, options, callback) => {
		template.render(data, callback);
	})
	
	/*exists(path).then(doesExist => {
		if (doesExist) var template = require(path);
		else var template = marko.load(filename, src);
		return template;
	}).then(template => {
		next(err, (data, options, callback) => {
			template.render(data, callback);
		})
	});*/

}
module.exports = {compile};