import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
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

if (typeof process !== 'undefined' && process.env.NO_OUTPUT) {
	delete base.targets;
	delete base.sourceMap;
}

export const server = Object.assign({}, base, {
	external: [
		'hapi', 'vision',	'inert', 'h2o2', 'boom', 'joi',
		'handlebars', 'path', 'url', 'moment'
	],
	plugins: [
		json({
			//include: 'package.json'
		})
	],
});

export const browser = Object.assign({}, base, {
	plugins: [
		babel({
			plugins: ['transform-react-jsx', 'external-helpers-2']
		}),
		nodeResolve({
			module: true,
			jsnext: true, 
			browser: true
		}),
		replace({
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