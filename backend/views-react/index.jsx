import ReactDOM from 'react-dom/server';

/**
 * Renders an HTML page using the provided head and body elements
 * @param {ReactElement} _head - MUST be wrapped with a head tag
 * @param {ReactElement} _body - will contain react markup for faster loading
 * @returns {string} the rendered html page
 */
export default function render(_head, _body) {
	let head = ReactDOM.renderToStaticMarkup(_head);
	if (!head.startsWith('<head>')) 
		throw Error('head element must be wrapped in a head tag!');

	let body = `<body>${ReactDOM.renderToString(body)}</body>`

	return `<!doctype html><html>${head}${body}</html>`;
}