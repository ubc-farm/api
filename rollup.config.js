import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

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
		})
	],
	sourceMap: true
}