import buble from 'rollup-plugin-buble';

export default {
	plugins: [
		buble({
			target: {chrome: 50}
		})
	],
	sourceMap: true,
	external: ['react', 'react-dom'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	}
}