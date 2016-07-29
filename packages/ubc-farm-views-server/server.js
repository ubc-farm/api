import {Server} from 'hapi';
import Vision from 'vision';
import Handlebars from 'handlebars';
import {resolve} from 'path';
import routeArray from './routes/index.js';
import {server as connection} from './package.json';

const server = new Server();
server.connection(connection);
server.path(resolve(__dirname, '../'));

server.register(Vision, err => {if (err) throw err});

server.views({
	engines: {
		html: Handlebars,
		hbs: Handlebars
	},
	relativeTo: resolve(__dirname, '../'),
	path: '.',
	partialsPath: 'ubc-farm-view-helpers/partials',
	helpersPath: 'ubc-farm-view-helpers/helpers',
	isCached: process.env.NODE_ENV !== 'development'
})

server.route(routeArray);

export default server;