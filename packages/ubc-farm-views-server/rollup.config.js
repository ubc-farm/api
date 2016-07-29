export default {
	entry: 'index.js',
	external: [
		'hapi',
		'vision',
		'handlebars',
		'path'
	],
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};