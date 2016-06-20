import {Server} from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import path from 'path';

import routes from './routes';
import {engine as markoEngine} from './routes/marko.js';

const server = new Server();
server.connection({
	host: 'localhost',
	port: 3000
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
		path: path.join(__dirname, '../views');
	})
})

server.route(routes);
server.start(err => {})