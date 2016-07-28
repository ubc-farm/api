import {Server} from 'hapi';

const server = new Server();

import rollupHandler from './handler.js';
server.handler('package', rollupHandler);

import Inert from 'inert';
server.register(Inert, () => {});

import routes from './routes/index.js';
server.routes(routes);

export default server;