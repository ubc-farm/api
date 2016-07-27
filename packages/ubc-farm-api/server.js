import {Server} from 'hapi';
import database_routes from './database-routes';
import hacky_routes from './hacky-routes';

const server = new Server();
server.connection({port: 3000});

server.start().then(() => {
	console.log(`Server running at: ${server.info.uri}`);
})

server.route(database_routes);
server.route(hacky_routes);

export default server;