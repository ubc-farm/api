import {Server} from 'hapi';
import Vision from 'vision';
import Handlebars from 'handlebars';
import {resolve} from 'path';

const packageFolder = resolve(__dirname, '../')

export const port = 3040;

const server = new Server();
server.connection({port});
server.path(packageFolder);

server.register(Vision, err => {if (err) throw err});

server.views({
	engines: {
		html: Handlebars,
		hbs: Handlebars
	},
	relativeTo: packageFolder,
	path: '.',
	partialsPath: 'ubc-farm-view-helpers/partials',
	helpersPath: 'ubc-farm-view-helpers/helpers',
	isCached: process.env.NODE_ENV !== 'development'
})

export default server;