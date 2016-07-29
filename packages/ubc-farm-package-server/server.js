import {Server} from 'hapi';
import Inert from 'inert';
import {resolve} from 'path';

import rollupHandler from './handler.js';
import routes from './routes/index.js';

export const port = 3002;

const server = new Server({
	debug: {
		request: ['error']
	}
});
server.path(resolve(__dirname, '../'))
server.connection({port});

server.handler('package', rollupHandler);
server.register(Inert, () => {});

server.route(routes);

export default server;