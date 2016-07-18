import {resolve} from 'path';

export default [
	{
		method: 'GET',
		path: '/css/core/{param}',
		handler: {
			directory: {
				path: resolve(__dirname, '../../core-styles'),
				listing: true,
				defaultExtension: 'css'
			}
		}
	},
	{
		method: 'GET',
		path: '/css/partials/{param}',
		handler: {
			directory: {
				path: resolve(__dirname, '../../views/_partials'),
				defaultExtension: 'css'
			}
		}
	}
];