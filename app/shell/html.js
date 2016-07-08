import React, {PropTypes} from 'react';

const Css = ({file, href = `/css/${file}.css`}) => (
	<link href={href} rel='stylesheet' key={file}/>
)

const CssAsync = ({file, href = `/css/${file}.css`}) => (
	`<link rel='preload' href='${href}' as='style' onload="this.rel='stylesheet'">
	<noscript><link rel='stylesheet' href='${href}'></noscript>`
)

const JS = ({src}) => (
	<script key={src}>{`System.import('${src}')`}</script>
)

const defaultCss = [
	'base',	'modules/hover-light', 
	'layout/header', 'modules/sidebar'
];

const HTML = ({title, css, js, children}) => (
	<html>
		<head>
			<meta charSet="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<title>{props.title}</title>
			<script async src="/js/vendor/analytics.js"></script>
			<script src="/js/vendor/system.js"></script>
			<script src="/js/sys-config.js"></script>
			<script id='react-state' 
				dangerouslySetInnerHTML={{__html: props.state}}></script>
			<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' 
				rel='stylesheet'/>
			{[...defaultCss, ...css].map(name => <Css file={name}/>)}
			{js.map(src => <JS src={src}/>)}
		</head>
		<body>
			<div id='app-mount' dangerouslySetInnerHTML={{__html: children}}/>
		</body>
	</html>
)

HTML.propTypes = {
	title: PropTypes.string,
	css: PropTypes.arrayOf(PropTypes.string),
	js: PropTypes.arrayOf(PropTypes.string)
}

HTML.defaultProps = {
	title: 'UBC Farm',
	css: [], js: []
}

export default HTML;