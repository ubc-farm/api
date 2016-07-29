import server from './server.js';

const name = 'View';

server.start().then(() => {
	console.log(`[+] ${name} server running at: ${server.info.uri}`);
}).catch(err => {
	console.error(`[x] ${name} server issue: ${err}`)
})