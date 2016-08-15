import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.node.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' }
	],
	external: [
		'hapi', 'vision', 'inert', 'h202', 'boom', 'joi',
		'knex', 'pg', 'objection',
		'path', 'url'
	],
	plugins: [
		json(),
		nodeResolve({jsnext: true}),
		commonjs({
			include: [
				'node_modules/**',
				'database/_migrations/**',
				'database/_seeds/**',
				'database/knexfile.js'
			]
		})
	]
};