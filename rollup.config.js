import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	plugins: [
		babel({
			exclude: 'node_modules/**',
			plugins: ['transform-react-jsx', 'external-helpers-2']
		}),
		nodeResolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs()
	],
	sourceMap: true,
	external: ['react', 'react-dom'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	}
}