import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'index.js',
	dest: 'index.node.js',
	format: 'cjs',
	external: ['knex', 'objection', 'pg'],
	plugins: [
		commonjs(),
		alias({
			'ubc-farm-util-classes': '../ubc-farm-util-classes'
		})
	]
};