import {Server} from 'hapi';

import {config as connection} from '../package.json';

import databaseRoutes from './database-routes/index.js';
import hackyRoutes from './hacky-database-routes/index.js';

const server = new Server({
	connections: {
		routes: {
			cors: true
		}
	},
	debug: {
		request: ['error']
	}
});

server.connection(connection);

server.route(databaseRoutes);
server.route(hackyRoutes);

export default server;