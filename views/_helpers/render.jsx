import ReactDOM from 'react-dom/server';

/** Creates CSS link tags from the given files */
function css(...files) {
	return files.map(file => `<link href="/css/${file}.css" rel="stylesheet">`);
}

/**
 * Renders an HTML page using the provided head and body elements
 * @param {ReactElement} _body - will contain react markup for faster loading
 * @param {Object} props
 * @returns {string} the rendered html page
 */
export default function renderPage(_body, props) {
	return `
		<!doctype html>
		<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>${props.title}</title>
				<script async src="/js/vendor/analytics.js"></script>
				<script src="/js/vendor/system.js"></script>
				<script src="/js/vendor/sys-config.js"></script>
				<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
				      rel="stylesheet">
				${css(
					'base', 'modules/hover-light', 'layout/header',
					'modules/sidebar', ...props.css
				)}
				${props.script.map(js => `<script>System.import('${js}')</script>`)}
			</head>
			<body>
				<div id="react-root">${ReactDOM.renderToString(_body)}</div>
			</body>
		</html>
		`;
}

export {default as Layout} from './layout.js';