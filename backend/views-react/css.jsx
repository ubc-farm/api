import React, { PropTypes } from 'react';

export function CSS(props) {
	let href = props.src ? '/css/'+props.src : props.href;
	return (
		<link {...props} rel='stylesheet' href={href}/>
	);
}

var styles = new Set();
export default function loadCSS(...files) {
	return files.map(file => {
		if (styles.has(file)) return null;
		styles.add(file);
		return <CSS src={file}/>
	})
}