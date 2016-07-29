import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	plugins: [
		nodeResolve({jsnext: true}),
		commonjs(),
		buble({ target: {chrome: 50} })
	],
	sourceMap: true,
	external: ['react', 'react-dom'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	}
}