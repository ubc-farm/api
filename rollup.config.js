import babel from 'rollup-plugin-babel';

export default {
	plugins: [
		babel({
			exclude: 'node_modules/**',
			plugins: ['transform-react-jsx', 'external-helpers-2']
		})
	],
	sourceMap: true
}