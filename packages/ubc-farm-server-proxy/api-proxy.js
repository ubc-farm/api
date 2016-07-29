//import {port} from '../ubc-farm-api/server.js';
const port = 3080;
import {host, protocol, options} from './proxy.js';

export const handler = Object.assign({}, options, {
	host, protocol, port
});

export default {
	method: [
		'GET', 'POST', 'PUT',
		'DELETE', 'PATCH', 'OPTIONS'
	],
	path: '/api/{path*}',
	handler: {proxy: handler}
};