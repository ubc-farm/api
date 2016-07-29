import {server as connection} from '../ubc-farm-api/package.json';
const {hostname, protocol, port} = connection;

import {options} from './proxy.js';

export const handler = Object.assign({}, options, {
	host: hostname, protocol, port
});

export default {
	method: [
		'GET', 'POST', 'PUT',
		'DELETE', 'PATCH', 'OPTIONS'
	],
	path: '/api/{path*}',
	handler: {proxy: handler}
};