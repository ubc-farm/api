import {parse} from 'url';

import {server as staticObj} from '../ubc-farm-static-assets/package.json';
import {server as bundlerObj} from '../ubc-farm-package-server/package.json';
import {server as viewObj} from '../ubc-farm-views-server/package.json';

export const host = 'localhost';
export const protocol = 'http';

export const options = {
	passThrough: true,
	xforward: true,
	redirects: 5,
}

export default function(request, reply) {
	const {pathname} = parse(request.path);
	
	function useConnection(connection) {
		const {host, port, protocol} = connection;
		const opts = Object.assign({}, options, { host, port, protocol });
		return reply.proxy(opts);
	}

	const [, subfolder] = pathname.split('/');
	switch (subfolder) {
		case 'analytics.js':
		case 'css': 
			return useConnection(staticObj);

		case 'packages': return useConnection(bundlerObj);

		case 'finance':
		case 'directory':
		case 'fields':
		case 'calendar':
			return useConnection(viewObj);
	}
}