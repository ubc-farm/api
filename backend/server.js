import {Server} from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import path from 'path';

import routes from './routes';

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
			marko: {
				compile: function(src, options) {
					const template = marko.load(options.filename, src);
					return context => template.renderSync(context);
				}
			}
		},
		path: path.join(__dirname, '../views');
	})
})

server.route(routes);
server.start(err => {})