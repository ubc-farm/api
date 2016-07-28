import {Server} from 'hapi';
import Inert from 'inert';

import rollupHandler from './handler.js';
import routes from './routes/index.js';

export const port = 3002;

const server = new Server();
server.connection({port});

server.handler('package', rollupHandler);
server.register(Inert, () => {});

server.routes(routes);

export default server;