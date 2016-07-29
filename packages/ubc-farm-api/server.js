import {Server} from 'hapi';
import databaseRoutes from './database-routes/index.js';
import hackyRoutes from './hacky-database-routes/index.js';

export const port = 3080;

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

server.connection({port});

server.route(databaseRoutes);
server.route(hackyRoutes);

export default server;