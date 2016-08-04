import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'index.js',
	external: ['moment', 'hammerjs'],
	plugins: [
		nodeResolve({jsnext: true, browser: true}),
		commonjs()
	],
	sourceMap: true,
	moduleName: 'Timeline',
	targets: [
		{ dest: 'index.es.js', format: 'es' },
		{ dest: 'index.iife.js', format: 'iife' }
	]
};