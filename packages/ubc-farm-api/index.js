import server from './server.js';

server.start().then(() => {
	console.log(`Server running at: ${server.info.uri}`);
})

export default server;