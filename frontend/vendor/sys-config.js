const googleMeta = {
	scriptLoad: true,
	format: 'global',
	exports: 'google'
};
System.config({
	baseURL: '/js',
	map: {
		'google/maps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARDOjzy7qB7QdqbO0i5Gt5q_ogVcTSdWU',
		'google/maps/drawing': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARDOjzy7qB7QdqbO0i5Gt5q_ogVcTSdWU&libraries=drawing',
		'google/maps/edit': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARDOjzy7qB7QdqbO0i5Gt5q_ogVcTSdWU&libraries=geometry,drawing',
		jsts: '/js/vendor/jsts.js',
		react: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.js',
		'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js',
		'react-router': '/js/vendor/react-router'
	},
	meta: {
		'google/maps': googleMeta,
		'google/maps/drawing': googleMeta,
		'google/maps/edit': googleMeta
	}
})