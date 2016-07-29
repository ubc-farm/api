import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';

export default {
	plugins: [
		buble({ target: {chrome: 50} }),
		nodeResolve({jsnext: true}),
		commonjs({ignoreGlobals: true}),
		alias({ 'react-redux': '../react-redux/index.js' }),
	],
	sourceMap: true,
	external: ['react', 'react-dom'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	}
}