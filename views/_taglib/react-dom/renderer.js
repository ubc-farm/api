const React = require('react');
const ReactDOM = require('react-dom/server');

exports.render = (input, out) => {
	let reactClass = input.src;
	let element = React.createElement(require(reactClass));
	out.write(ReactDOM.renderToString(element));
}