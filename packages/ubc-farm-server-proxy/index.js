import server from './server.js';

server.start().then(() => {
	console.log(`Reverse proxy server running at: ${server.info.uri}`);
});