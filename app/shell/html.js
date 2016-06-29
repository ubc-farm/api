import React, {PropTypes} from 'react';

function CSS(props) {
	const href = props.href || `/css/${props.file}.css`;
	return <link href={href} rel='stylesheet' key={props.file}/>
}

function JS({src}) {
	return <script key={src}>{`System.import('${src}')`}</script>
}

export default function Component(props) {
	const css = [
		'base',	'modules/hover-light', 
		'layout/header', 'modules/sidebar',
		//'modules/icon', 'modules/icon-button',
		//'modules/text-field', 
		...props.css 
	]; 
	return (
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
				{css.map(name => <CSS file={name}/>)}
				{props.js.map(src => <JS src={src}/>)}
			</head>
			<body>
				<div id='app-mount' dangerouslySetInnerHTML={{__html: props.children}}/>
			</body>
		</html>
	)
}
Component.propTypes = {
	title: PropTypes.string,
	css: PropTypes.arrayOf(PropTypes.string),
	js: PropTypes.arrayOf(PropTypes.string)
}
Component.defaultProps = {
	title: 'UBC Farm',
	css: [], js: []
}