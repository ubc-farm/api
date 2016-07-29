import server from './server.js';

server.start().then(() => {
	console.log(`View server running at: ${server.info.uri}`);
});