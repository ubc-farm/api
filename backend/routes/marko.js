const Promise = require('bluebird');
const stat = Promise.promisify(require('fs').stat);
const marko = require('marko');
const path = require('path');

/**
 * Function to check if a file exists via fs.stat
 * @returns {Promise<boolean>} true if the file exists, false otherwise
 */
function exists(path) {
	stat(path)
		// Non-standard Bluebird promise catcher
		// Equivalent code would be an if function that re-throws the error if it 
		// isn't an ENOENT error.
		.catch({code: 'ENOENT'}, () => false) 
		// Normally stat returns a fs.Stats object, but if the catch activated then
		// it returns null instead
		.then(stats => stats !== false) 
}

function handler(request, reply) {
	let {dir, name, ext} = path.posix.parse(request.path);
	const filePath = path.format({dir, name, ext: '.marko'})
	if (ext === '') { //path to a directory (no extension is specified)
		//check if filename.marko exists, otherwise use filename/index.marko
		exists(filePath).then(doesExist => {
			if (doesExist) {
				return reply.view(filePath);
			} else {
				return reply.view(path.join(dir, name, 'index.marko'));
			}
		})
	} else return reply.view(filePath);
}

/** Routes for marko views */
exports.default = [
	{
		method: 'GET',
		path: '/fields/edit/{clientParams*}',
		handler
	}
];

/**
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