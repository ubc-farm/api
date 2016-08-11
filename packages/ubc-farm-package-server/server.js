import {resolve} from 'path';
import {Server} from 'hapi';
import Inert from 'inert';

import {server as connection} from './package.json';
import rollupHandler from './builder.js';
import routes from './routes/index.js';

const server = new Server(/*{
	debug: {
		request: ['error']
	}
}*/);
server.path(resolve(__dirname, '../'))
server.connection(connection);

server.handler('package', rollupHandler);
server.register(Inert, () => {});

server.route(routes);

export default server;