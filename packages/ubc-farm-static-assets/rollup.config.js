import {resolve} from 'path';
import json from 'rollup-plugin-json';

export default {
	entry: 'index.js',
	external: ['hapi', 'inert'],
	plugins: [json()],
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};