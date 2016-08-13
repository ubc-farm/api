import {server as base, browser} from '../../rollup.default.config.js';

const externals = [
	...base.external, 
	...browser.external,
	'rollup'
]

export default Object.assign({}, base, {
	external(id) {
		if (id.startsWith('rollup-plugin')) 
			return true;
		else if (externals.includes(id))
			return true;
		else return false;
	}
})