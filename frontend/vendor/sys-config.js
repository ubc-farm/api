(function(System) {
	function firebase(map, ...features) {
		let config = {};
		for (let feature of features) {
			config['firebase/' + feature] = 
				`https://www.gstatic.com/firebasejs/3.0.5/firebase-${feature}.js`;
		}
		return Object.assign(map, config);
	}
	const gMap = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARDOjzy7qB7QdqbO0i5Gt5q_ogVcTSdWU';
	const map = {
		'google/maps': gMap,
		'google/maps/edit': gMap + '&libraries=geometry,drawing',
		jsts: '/js/vendor/jsts.js',
		react: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.js',
		'react-dom': 
			'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js',
		'react-router': '/js/vendor/react-router'
	}

	System.config({
		baseURL: '/js',
		map: firebase(map, 'app', 'auth', 'database', 'storage'),
		meta: {
			'google/maps/*': {
				scriptLoad: true,
				format: 'global',
				exports: 'google'
			},
			'firebase/*': { 
				format: 'global'
			}
		}
	})
})(System)