import {Server} from 'hapi';
import proxyHandler from './proxy.js';
import apiProxy from './api-proxy.js';

const server = new Server();
server.connection({
	port: 3000
});

import h2o2 from 'h2o2';
server.register(h2o2, err => {if (err) throw err});

server.route({
	method: 'GET',
	path: '/{path*}',
	handler: proxyHandler
});

server.route(apiProxy);

server.start();
export default server;