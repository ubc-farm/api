import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
	plugins: [
		nodeResolve({jsnext: true, browser: true}),
		commonjs({ignoreGlobals: true}),
		replace({'process.env.NODE_ENV': JSON.stringify('production')}),
		buble({ target: {chrome: 50}, jsx: 'h' }),
	],
	sourceMap: true,
	external: ['react', 'react-dom'],
	globals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	}
}