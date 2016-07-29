import json from 'rollup-plugin-json';

export default {
	entry: 'index.js',
	format: 'cjs',
	dest: 'index.node.js',
	external: ['hapi', 'h2o2'],
	plugins: [json()],
	sourceMap: true
};