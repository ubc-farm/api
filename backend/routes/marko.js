const Promise = require('bluebird');
const path = require('path');
const glob = Promise.promisify(require('glob'));

let render = require('../render');

/**
 * A route configuration similar to koa-route Layers
 * @typedef {Object} Layer
 * @property {string|string[]} method - methods that this route accepts
 * @property {string} path - path for the route, parsed through path-to-regexp
 * @property {function|function[]} middleware - middleware used for this route
 * @property {Object} [opts] - options passed to koa-router
 * @property {string} [opts.name] - name of the route
 */

/**
 * Gets list of marko folders as routes then creates Layer routes
 * that correspond to each folder. The route middleware
 * is in the render folder.
 * @type {Promise<Layer[]>}
 */
module.exports = glob('**/index.marko', {
	ignore: '**/_*/*',
	cwd: path.join(__dirname, '../../views')
})
.map(file => path.posix.join('/', path.parse(file).dir))
.map(folder => {
	return {
		method: "GET",
		path: folder,
		middleware: render,
		opts: {name: folder}
	}
})