import {resolve} from 'path';
import alias from 'rollup-plugin-alias';
import json from 'rollup-plugin-json';

export default {
	entry: 'index.js',
	external: [
		'hapi',
		resolve(__dirname, '../ubc-farm-database'),
		resolve(__dirname, '../ubc-farm-database/index.node.js'),
		'../ubc-farm-database/index.node.js',
	],
	plugins: [
		alias({
			'../ubc-farm-database': '../ubc-farm-database/index.node.js',
			'../../ubc-farm-database': '../ubc-farm-database/index.node.js'
		}),
		json()
	],
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};