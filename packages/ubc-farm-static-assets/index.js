import server from './server.js';

server.start().then(() => {
	console.log(`Static server running at: ${server.info.uri}`);
});