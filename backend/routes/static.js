/**
 * Shared configuration for all the static routes.
 * @todo config.cache
 */
const config = {
	files: {
		relativeTo: process.env.WWW_STATIC
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
			path: 'root',
			index: false
		},
		config
	},
	{
		method: 'GET',
		path: '/assets/{param*}',
		handler: {
			path: 'assets',
			listing: true
		},
		config
	},
	{
		method: 'GET',
		path: '/js/{param*}',
		handler: {
			path: 'js',
			listing: true,
			defaultExtension: 'js'
		},
		config
	},
	{
		method: 'GET',
		path: '/css/{param*}',
		handler: {
			path: 'css',
			listing: true,
			defaultExtension: 'css'
		},
		config
	}
]
export default routes;