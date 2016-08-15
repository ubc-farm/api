import commonjs from 'rollup-plugin-commonjs';
import base from '../../rollup.default.config.js';

export default Object.assign({}, base, {
	external: [
		//...base.external,
		'knex', 'pg', 'objection'
	],
	plugins: [
		//...base.plugins,
		commonjs({
			include: [
				'_migrations/**',
				'_seeds/**',
				'knexfile.js'
			]
		})
	]
});