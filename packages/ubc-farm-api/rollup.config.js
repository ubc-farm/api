import {resolve} from 'path';

export default {
	entry: 'index.js',
	dest: 'index.node.js',
	format: 'cjs',
	external: [
		'hapi',
		resolve(__dirname, '../ubc-farm-database/index.js')
	],
};