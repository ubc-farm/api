import {resolve} from 'path';
const cssFolder = resolve(__dirname, '../../ubc-farm-css');

export default {
	method: 'GET',
	path: '/css/{param}',
	handler: {
		directory: {
			path: cssFolder,
			listing: true,
			defaultExtension: 'css',
			index: false
		}
	}
}