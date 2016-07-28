import {port} from '../ubc-farm-api/server.js';
import {host, protocol, options} from './proxy.js';

export const handler = Object.assign({}, options, {
	host, protocol, port
});

export default {
	method: '*',
	path: '/api/{path*}',
	handler
};