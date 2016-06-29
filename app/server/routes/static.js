/**
 * Shared configuration for all the static routes.
 * @todo config.cache
 */
const config = {
	files: {
		relativeTo: process.env.WORKSPACE_ROOT //process.env.WWW_STATIC
	},
	auth: false,
}

/**
 * The static route configuration, which is parsed through Inert.
 * @module backend/routes/static
 * @type {Object[]}
 */
const routes = [
	{
		method: 'GET',
		path: '/{param}',
		handler: {
			directory: {
				path: 'root',
				index: false
			}
		},
		config
	},
	{
		method: 'GET',
		path: '/assets/{param*}',
		handler: {
			directory: {
				path: 'assets',
				listing: true
			}
		},
		config
	},
	{
		method: 'GET',
		path: '/js/{param*}',
		handler: {
			directory: {
				path: 'dist/browser',
				listing: true,
				defaultExtension: 'js'
			}
		},
		config
	},
	{
		method: 'GET',
		path: '/app/{param*}',
		handler: {
			directory: {
				path: 'dist/browser/app',
				listing: false,
				defaultExtension: 'js'
			}
		},
		config
	},
	{
		method: 'GET',
		path: '/lib/{param*}',
		handler: {
			directory: {
				path: 'dist/browser/lib',
				listing: true,
				defaultExtension: 'js'
			}
		},
		config
	},
	{
		method: 'GET',
		path: '/modules/{param*}',
		handler: {
			directory: {
				path: 'dist/browser/node_modules',
				listing: false,
				defaultExtension: 'js'
			}
		},
		config
	},
	{
		method: 'GET',
		path: '/css/{param*}',
		handler: {
			directory: {
				path: 'styles',
				listing: true,
				defaultExtension: 'css'
			}
		},
		config
	}
]
export default routes;