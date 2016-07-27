require('./sql-init.js')

import {Server} from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import path from 'path';
import Handlebars from 'handlebars';

import apiHandler from 'lib/api-handler';
import templateHandler from 'app/template-handler';
import routes from './routes';
import markoEngine from './marko-engine.js';
import reactEngine from 'hapi-react-views';

const viewPath = path.join(__dirname, '../../../../views');

const server = new Server();
server.connection({
	host: 'localhost',
	port: process.env.NODE_PORT || 3000
})
server.handler('api', apiHandler);
server.handler('template', templateHandler);

server.register([Inert, Vision], err => {
	if (err) throw err;
	server.views({
		engines: {
			'html': {
				module: Handlebars,
				path: path.resolve(__dirname, '../views'),
				partialsPath: path.resolve(__dirname, '../views/_partials')
			},
			'marko': {
				module: markoEngine,
				compileMode: 'async',
				path: path.join(process.env.WORKSPACE_ROOT, 'views')
			},
			'js': {
				module: reactEngine,
				compileOptions: {
					renderMethod: 'renderToString',
					layoutPath: path.join(__dirname, '../shell'),
					layout: 'html.js'
				},
				path: path.resolve(__dirname, '../../')
			}
		}
	})

	server.route(routes);
	server.start(err => {})
})

export default server;