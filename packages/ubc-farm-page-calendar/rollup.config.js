import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
	plugins: [
		buble({
			target: {chrome: 50}
		}),
		nodeResolve({jsnext: true, browser: true}),
		replace({'process.env.NODE_ENV': JSON.stringify('production')}),
		commonjs()
	],
	sourceMap: true,
	external: ['react', 'react-dom'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	}
}