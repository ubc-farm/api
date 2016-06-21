const React = require('react');
const ReactDOM = require('react-dom/server');

exports.render = (input, out) => {
	const reactClass = input.src;
	const element = React.createElement(require(reactClass));
	out.write(ReactDOM.renderToString(element));
}