import server from './server.js';

server.start().then(() => {
	console.log(`Package bundler server running at: ${server.info.uri}`);
});