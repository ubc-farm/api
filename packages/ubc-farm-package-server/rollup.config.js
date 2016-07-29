import json from 'rollup-plugin-json';

export default {
	entry: 'index.js',
	external: [
		'path', 'rollup', 'hapi', 'inert',
		'rollup-plugin-buble',
		'rollup-plugin-commonjs',
		'rollup-plugin-node-resolve'
	],
	plugins: [json()],
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};