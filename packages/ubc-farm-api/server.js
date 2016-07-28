import {Server} from 'hapi';
import databaseRoutes from './database-routes/index.js';
import hackyRoutes from './hacky-database-routes/index.js';

const server = new Server({
	connections: {
		routes: {
			cors: true
		}
	}
});

server.route(databaseRoutes);
server.route(hackyRoutes);

export default server;