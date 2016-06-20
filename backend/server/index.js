import {Server} from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import path from 'path';

import routes from './routes';
import markoEngine from './marko-engine.js';

const server = new Server();
server.connection({
	host: 'localhost',
	port: process.env.NODE_PORT || 3000
})

server.register(Inert, () => {})

server.register(Vision, err => {
	if (err) throw err;
	server.views({
		engines: {
			'marko': {
				module: markoEngine,
				compileMode: 'async'
			}
		},
		path: path.join(__dirname, '../views')
	})
})

server.route(routes);
server.start(err => {})

export default server;