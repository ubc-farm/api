const {registerPartial, registerHelper} = require('handlebars');
const {basename, join} = require('path');
const {readdir, readFile} = require('fs');

/** 
 * @param {function} an async function where the last argument is
 * a callback in the `(err, data) => {}` format
 * @returns {function} the given method, which now returns a promise
 */
function promisify(method) {
	return (...args) => new Promise((resolve, reject) => {
		method(...args, (error, result, ...rest) => {
			if (error) reject(error);
			else if (rest.length > 0) resolve([result, ...rest]);
			else resolve(result);
		})
	});
}

/**
 * Gets the default export from a module
 * @param {any} ex - module to check
 */
function interopDefault(ex) {
	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
} 

const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);

/**
 * Loads a partial at the given path
 * @param {string} path
 * @param {string} [name] of the partial, defaults to the basename of the path
 * @returns {Promise}
 */
function loadPartial(path, name = basename(path)) {
	return readFileAsync(path, 'utf8')
		.then(data => registerPartial(name, data));
} 

/**
 * Loads a helper at the given path
 * @param {string} path
 * @param {string} [name] of the helper, defaults to the basename of the path
 */
function loadHelper(path, name = basename(path)) {
	//eslint-disable-next-line global-require
	const helperModule = require(path); 
	const helper = interopDefault(helperModule);

	registerHelper(name, helper);
}

/**
 * Loads all partials and helpers in their respective folders
 * @returns {Promise}
 */
function loadAll() {
	return Promise.all([
		readdirAsync(join(__dirname, 'partials')),
		readdirAsync(join(__dirname, 'helpers'))
	]).then(([partials, helpers]) => {
		helpers.forEach(path => loadHelper(path));
		return Promise.all(partials.map(path => loadPartial(path)));
	});
}

exports.default = loadAll;
exports.loadPartial = loadPartial;
exports.loadHelper = loadHelper;