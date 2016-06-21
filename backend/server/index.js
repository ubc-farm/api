import {Server} from 'hapi';
import Inert from 'inert';
import Vision from 'vision';

import routes from './routes';
import markoEngine from './marko-engine.js';
import reactEngine from 'hapi-react-views';

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
			},
			'jsx': {
				module: reactEngine,
				compileOptions: {
					renderMethod: 'renderToString',
				}
			}
		},
		relativeTo: __dirname,
		path: '../../views'
	})
})

server.route(routes);
server.start(err => {})

export default server;