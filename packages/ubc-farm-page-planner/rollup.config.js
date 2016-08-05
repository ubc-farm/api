import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import {browser as base} from '../../rollup.default.config.js';

export default Object.assign({}, base, {
	plugins: [
		...base.plugins.slice(0, 3),
		
		/*alias({
			'vis-timeline': '../packages/vis-timeline/index.es.js'
		})*/
	],
	external: [
		...base.external,
		'momement', 'vis-timeline'
	]
})