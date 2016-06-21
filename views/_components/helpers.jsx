import React, { PropTypes } from 'react';

/**
 * An if helper component. 
 * @param {boolean} props.cond - if cond is true,
 * @param {any} props.children - children is rendered. Otherwise returns null;
 */
export default function IfTag(props) {
	if (props.cond) {
		return props.children;
	} else return null;
}
IfTag.propTypes = {
	children: PropTypes.any.isRequired
}
IfTag.defaultProps = {
	cond: false
}