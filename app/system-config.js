(function(System) {
	const googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARDOjzy7qB7QdqbO0i5Gt5q_ogVcTSdWU';
	const metaForGoogleMapsModules = {
		scriptLoad: true,
		format: 'global',
		exports: 'google'
	}

	const modules = ['react', 'react-dom', 'jsts', 'react-redux', 'redux'];
	const moduleMap = modules.reduce((obj, moduleName) => {
		obj[moduleName] = 'node_modules/' + moduleName; return obj;
	}, {})

	System.config({
		baseURL: '/js',
		defaultExtension: 'js',
		map: Object.assign({
			'google/maps': googleMapsUrl,
			'google/maps/edit': googleMapsUrl + '&libraries=geometry,drawing',
			'google/maps/drawing': googleMapsUrl + '&libraries=drawing'
		}, moduleMap),
		meta: {
			'google/maps': metaForGoogleMapsModules,
			'google/maps/edit': metaForGoogleMapsModules,
			'google/maps/drawing': metaForGoogleMapsModules
		},
		packages: {
			'react': {main: 'dist/react.js'},
			'react-dom': {main: 'dist/react-dom.js'},
			'jsts': {main: 'dist/jsts.min.js'},
			'react-redux': {main: 'src/index.js'},
			'redux': {main: 'src/index.js'},
<<<<<<< HEAD
			'redux-thunk': {main: 'src/index.js'}
=======
			'redux-form': {main: 'src/index.js'},
>>>>>>> feature/inventory-page
		},
		paths: {
			'firebase/*': 'https://www.gstatic.com/firebasejs/3.0.5/firebase-*.js'
		}
	})
})(System)