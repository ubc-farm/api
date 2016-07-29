import server from './server.js';

const name = 'Reverse proxy';

server.start().then(() => {
	console.log(`[+] ${name} server running at: ${server.info.uri}`);
}).catch(err => {
	console.error(`[x] ${name} server issue: ${err}`)
})