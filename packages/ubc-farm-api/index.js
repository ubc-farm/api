import server from './server.js';

server.start().then(() => {
	console.log(`API server running at: ${server.info.uri}`);
});