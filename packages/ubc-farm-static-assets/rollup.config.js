import {resolve} from 'path';

export default {
	entry: 'index.js',
	external: ['hapi', 'inert'],
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};