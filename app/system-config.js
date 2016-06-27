(function(System) {
	const google_map_url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARDOjzy7qB7QdqbO0i5Gt5q_ogVcTSdWU';

	const metaForGoogleMapsModules = {
		scriptLoad: true,
		format: 'global',
		exports: 'google'
	}

	const googleMapsMap = {
		'google/maps': google_map_url,
		'google/maps/edit': google_map_url + '&libraries=geometry,drawing',
		'google/maps/drawing': google_map_url + '&libraries=drawing',
	}

	const reactMap = {
		react: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.js',
		'react-dom': 
			'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js',
		'react-router': '/js/vendor/react-router'
	}

	const firebaseMap = (function generateFirebaseMap(...features) {
		let map = {};
		for (let feature of features) {
			map['firebase/'+feature] = `https://www.gstatic.com/firebasejs/3.0.5/firebase-${feature}.js`;
		}
		return map;
	})('app', 'database', 'storage', 'auth');

	const otherModulesMap = {
		jsts: '/js/vendor/jsts.js'
	}

	System.config({
		baseURL: '/js',
		map: Object.assign({}, 
			googleMapsMap, 
			reactMap, 
			firebaseMap, 
			otherModulesMap
		),
		meta: {
			'google/maps': metaForGoogleMapsModules,
			'google/maps/edit': metaForGoogleMapsModules,
			'google/maps/drawing': metaForGoogleMapsModules,
			'firebase/*': { 
				format: 'global'
			}
		}
	})
})(System)