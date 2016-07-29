import {parse} from 'url';

import {server_uri as staticUri} from '../ubc-farm-static-assets/package.json';
import {server_uri as bundlerUri} from '../ubc-farm-package-server/package.json';
import {server_uri as viewUri} from '../ubc-farm-views-server/package.json';

export const host = 'localhost';
export const protocol = 'http';

export const options = {
	passThrough: true,
	xforward: true,
	redirects: 5,
}

export default function(request, reply) {
	const {pathname} = parse(request.path);
	
	function useUri(uri) {
		const {hostname: host, port, protocol} = parse(uri);
		const opts = Object.assign({}, options, { host, port, protocol });
		return reply.proxy(opts);
	}

	const [, subfolder] = pathname.split('/');
	switch (subfolder) {
		case 'analytics.js':
		case 'css': 
			return useUri(staticUri);

		case 'packages': return useUri(bundlerUri);

		case 'finance':
		case 'directory':
		case 'fields':
		case 'calendar':
			return useUri(viewUri);
	}
}