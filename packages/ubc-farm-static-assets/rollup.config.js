import {resolve} from 'path';

export default {
	entry: 'index.js',
	external: [
		'hapi', 'inert',
		resolve(__dirname, '../ubc-farm-database/index.js')
	],
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};