import React from 'react';

export function Component(props) {
	return (
		<html>
			<head>
				
			</head>
			<body>
				<div id='app-mount' dangerouslySetInnerHTML={{__html: props.children}}/>
			</body>
		</html>
	)
}