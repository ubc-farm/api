import json from 'rollup-plugin-json';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default base;
const base = {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
}

export const server = Object.assign({}, base, {
	external: [
		'hapi', 'vision',	'inert', 'h2o2',
		'handlebars', 'path'
	],
	plugins: [
		json({
			include: 'package.json'
		})
	],
});

export const browser = Object.assign({}, base, {
	plugins: [
		buble({
			target: {chrome: 50},
			jsx: 'h'
		}),
		nodeResolve({
			module: true,
			jsnext: true, 
			browser: true
		}),
		replace({
			include: 'node_modules/react-redux/**',
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		commonjs()
	],
	external: ['react', 'react-dom', 'tape'],
	globals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'tape': 'test'
	}
});

//export const baseAlt = Object.assign({}, base, {
//})