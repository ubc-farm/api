require("babel-register")({
	plugins: [
		'transform-strict-mode',
		'transform-react-jsx',
		'transform-es2015-modules-commonjs'
	],
	babelrc: false
});
require('marko/node-require').install();

const server = require('./server');