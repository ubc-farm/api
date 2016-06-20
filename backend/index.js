require("babel-register")({
	plugins: [
		'transform-strict-mode',
		'transform-react-jsx',
		'transform-es2015-modules-commonjs'
	],
	babelrc: false
});

const Promise = require('bluebird');
const server = require('./server');

const port = process.env.NODE_PORT || 3000;

server.then(app => {
	app.listen(port);
})