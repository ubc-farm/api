import {Server} from 'hapi';
//import Inert from 'inert';
import Vision from 'vision';
import {resolve} from 'path';
import HapiReactViews from 'hapi-react-views';

const server = new Server();
server.connection({
	host: 'localhost',
	port: 6000
})

server.register([/*Inert, */Vision], err => {
	if (err) throw err;

	server.views({
		engines: {
			js: HapiReactViews
		},
		relativeTo: resolve(__dirname, '../'),
		compileOptions: {
			layoutPath: __dirname,
			layout: 'shell'
		}
	});

	server.route({
		
	})

	server.start(err => {})
})

export default server;