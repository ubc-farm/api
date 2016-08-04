import alias from 'rollup-plugin-alias';
import {browser as base} from '../../rollup.default.config.js';

export default Object.assign({}, base, {
	plugins: [
		...base.plugins,
		alias({
			'vis-timeline': '../packages/vis-timeline/index.es.js'
		})
	]
})