import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'index.js',
	external: ['knex', 'objection', 'pg'],
	plugins: [
		commonjs(),
		alias({
			'ubc-farm-util-classes': '../ubc-farm-util-classes'
		})
	],
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};