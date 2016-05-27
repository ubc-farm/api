let googleMeta = {
	scriptLoad: true,
	format: 'global',
	exports: 'google'
};
var c = {
	baseURL: '/js',
	map: {
		//traceur: '/js/vendor/traceur.js',
		//'plugin-babel': '/js/vendor/plugin-babel.js',
		//'systemjs-babel-build': '/js/vendor/systemjs-babel-browser.js'
	},
	//transpiler: 'plugin-babel',
	//babelOptions: {
	//	es2015: false
	//},
	meta: {
		'google-maps': googleMeta,
		'google-maps-drawing': googleMeta,
	}
}