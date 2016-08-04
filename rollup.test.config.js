import base, {server, browser} from './rollup.default.config.js';

export default Object.assign({}, base, server, browser, {
	plugins: [...server.plugins, ...browser.plugins],
	external: [...server.external, ...browser.external],
	targets: undefined,
	sourceMap: false
})