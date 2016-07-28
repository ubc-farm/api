export default {
	entry: 'index.js',
	external: [
		'path', 'rollup', 
		'rollup-plugin-buble',
		'rollup-plugin-commonjs',
		'rollup-plugin-node-resolve'
	],
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};