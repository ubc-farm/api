import {Server} from 'hapi';

export const port = 3002;

const server = new Server();
server.connection({port});

import rollupHandler from './handler.js';
server.handler('package', rollupHandler);

import Inert from 'inert';
server.register(Inert, () => {});

import routes from './routes/index.js';
server.routes(routes);

export default server;