import server from './server.js';

/**
 * @done server works as desired
 * @todo write automated tape tests
 */

server.start().then(() => {
	console.log(`Static server running at: ${server.info.uri}`);
});