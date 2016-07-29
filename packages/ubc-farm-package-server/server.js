import {Server} from 'hapi';
import Inert from 'inert';
import {resolve} from 'path';

import {server_uri as uri} from './package.json';
import rollupHandler from './builder.js';
import routes from './routes/index.js';

export const port = 3002;

const server = new Server({
	debug: {
		request: ['error']
	}
});
server.path(resolve(__dirname, '../'))
server.connection({uri});

server.handler('package', rollupHandler);
server.register(Inert, () => {});

server.route(routes);

export default server;