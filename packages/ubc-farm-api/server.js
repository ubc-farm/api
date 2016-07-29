import {Server} from 'hapi';
import databaseRoutes from './database-routes/index.js';
import hackyRoutes from './hacky-database-routes/index.js';
import {server_uri as uri} from './package.json' 

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

server.connection({uri});

server.route(databaseRoutes);
server.route(hackyRoutes);

export default server;