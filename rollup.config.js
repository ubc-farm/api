import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' },
	],
	external: [
		'hapi', 'joi', 'boom',
		'knex', 'pg', 'sqlite', 'objection',
		'path', 'url',
	],
	plugins: [
		nodeResolve({ jsnext: true }),
		commonjs({
			include: [
				'database/_migrations/**',
				'database/_seeds/**',
				'knexfile.js',
			],
		}),
		json(),
	],
};
