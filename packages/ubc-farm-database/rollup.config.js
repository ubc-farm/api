import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'index.js',
	external: ['knex', 'objection', 'pg'],
	plugins: [
		commonjs()
	],
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};