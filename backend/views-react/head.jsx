import React, { PropTypes } from 'react';
import {CSS, default as loadCSS} from './css.js';

export default function Head(props) {
	return (
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<title>{props.title}</title>
			<script async src="/js/vendor/analytics.js"></script>

			<script src='/js/vendor/system.js'></script>
			<script src='/js/vendor/sys-config.js'></script>

			<CSS href='https://fonts.googleapis.com/css?family=Open+Sans:400,700'/>
			{loadCSS('base.css', ...props.css)}

			{props.children}
		</head>
	)
}

Head.propTypes = {
	title: PropTypes.string.isRequired,
	css: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string
	])
}