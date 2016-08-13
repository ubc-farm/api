import {resolve} from 'path';
import alias from 'rollup-plugin-alias';
import {server as base} from '../../rollup.default.config.js';

export default Object.assign({}, base, {
	external: [
		...base.external,
		resolve(__dirname, '../ubc-farm-database'),
		resolve(__dirname, '../ubc-farm-database/index.node.js'),
		'../ubc-farm-database/index.node.js',
	],
	plugins: [
		...base.plugins,
		alias({
			'../ubc-farm-database': '../ubc-farm-database/index.node.js',
			'../../ubc-farm-database': '../ubc-farm-database/index.node.js'
		})
	]
});