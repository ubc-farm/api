import {resolve} from 'path';
const packageFolder = resolve(__dirname, '../../');
const cssFolder = resolve(packageFolder, './ubc-farm-css');

export const main = {
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

export const partialStyles = {
	method: 'GET',
	path: '/css/partials/{param}',
	handler: {
		directory: {
			path: resolve(packageFolder, './ubc-farm-view-helpers/styles'),
			listing: true,
			defaultExtension: 'css',
			index: false
		}
	}
}

export default [main, partialStyles];