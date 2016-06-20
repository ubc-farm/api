import {stat} from 'fs';
import marko from 'marko';

const routes = [];
export default routes;

export function compile(src, options, next) {
	const template = marko.load(options.filename, src);
	return context => template.renderSync(context);

	stat(options.filename + '.js', err => {
		if (err == null) {
			let path = require.resolve(options.filename + '.js');
			if (options.refresh) 
				delete require.cache[path];
			var template = require(path);
		} else if (err.code == 'ENOENT') {
			var template = marko.load(options.filename, src);
		} else {
			throw err;
		}


	})

	next(err, function(content, options, function(err, rendered) {}) {})
}

export function prepare(config, next) {

}/**
 * Async view engine for Vision. 
 */
function compile(src, {filename, refresh}, next) {
	let path = require.resolve(filename + '.js');
	if (refresh) delete require.cache[path];

	exists(filename).then(doesExist => {
		if (doesExist) var template = require(path);
		else var template = marko.load(filename, src);
		return template;
	}).then(template => {
		next(err, (data, options, callback) => {
			template.render(data, callback);
		})
	});
}
exports.engine = {compile};