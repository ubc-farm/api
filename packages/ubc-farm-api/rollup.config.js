import {resolve} from 'path';
import alias from 'rollup-plugin-alias';

export default {
	entry: 'index.js',
	external: [
		'hapi',
		resolve(__dirname, '../ubc-farm-database'),
	],
	plugins: [alias({
		'../ubc-farm-database': '../ubc-farm-database/index.node.js'
	})],
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};