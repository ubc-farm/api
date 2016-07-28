import {parse} from 'url';

//import {port as staticPort} from '../ubc-farm-static-assets/server.js';
//import {port as bundlerPort} from '../ubc-farm-package-server/server.js';
const staticPort = 3001;
const bundlerPort = 3002;

export const host = 'localhost';
export const protocol = 'http';

export const options = {
	passThrough: true,
	xforward: true,
	redirects: 5,
}

export default function(request, reply) {
	const {pathname} = parse(request.path);
	
	function usePort(port) {
		const opts = Object.assign({}, options, { host, port, protocol });
		return reply.proxy(opts);
	}

	const [subfolder] = pathname.substr(1).split('/');
	switch (subfolder) {
		case 'css': return usePort(staticPort);
		case 'packages': return usePort(bundlerPort);
	}
}