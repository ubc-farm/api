const method = 'GET';

function standardRoutes(pagename) {
	const directory = `ubc-farm-page-${pagename}`;
	return [
		{
			method,
			path: `/packages/${directory}/index.js`,
			handler: {
				file: `${directory}/index.iife.js`
			}
		},
		{
			method,
			path: `/packages/${directory}.js`,
			handler: (req, reply) => 
				reply().redirect(`/packages/${directory}/index.js`)
		},
		{
			method,
			path: `/packages/${directory}/{param*}`,
			handler: {
				directory: { path: directory }
			}
		}
	]
}

export const mapEditor = standardRoutes('map-editor');
export const mapEditorWorker = {
	method,
	path: '/packages/ubc-farm-page-map-editor/autogrid/worker.js',
	handler: {
		file: 'ubc-farm-page-map-editor/autogrid/index.es.js'
	}
}

export const invoice = standardRoutes('invoice');