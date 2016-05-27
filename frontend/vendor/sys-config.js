let googleMeta = {
	scriptLoad: true,
	format: 'global',
	exports: 'google'
};
System.config({
	baseURL: '/js',
	map: {
		'google/maps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARDOjzy7qB7QdqbO0i5Gt5q_ogVcTSdWU',
		'google/maps/edit': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARDOjzy7qB7QdqbO0i5Gt5q_ogVcTSdWU&libraries=geometry,drawing'
	},
	meta: {
		'google/maps': googleMeta,
		'google/maps/edit': googleMeta,
	}
})