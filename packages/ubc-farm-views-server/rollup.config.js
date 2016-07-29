import json from 'rollup-plugin-json';

export default {
	entry: 'index.js',
	external: [
		'hapi',
		'vision',
		'handlebars',
		'path'
	],
	sourceMap: true,
	plugins: [json()],
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};