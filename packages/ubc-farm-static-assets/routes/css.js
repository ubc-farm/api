export const main = {
	method: 'GET',
	path: '/css/{param}',
	handler: {
		directory: {
			path: 'ubc-farm-css',
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
			path: 'ubc-farm-view-helpers/styles',
			listing: true,
			defaultExtension: 'css',
			index: false
		}
	}
}

export default [main, partialStyles];