import React, { PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * @param {Object} props
 * @param {string} props.children
 * @param {string} [props.href] - link to use. If ommited, one is generated from the name
 * @param {boolean} [props.active] - if true, add the class active to this link
 * @param {string} [props.prefix=/] prefix for link generation
 * @param {boolean} [props.color] sets up link for colorized hover
 * @param {boolean} [props.hide] hides if true 
 */
export default function NavLink(props) {
	if (props.hide) return null;
	const href = props.href || props.prefix + props.children.toLowerCase();
	return (
		<a className={_(
			'nav-link', 'hover-light',
			{
				'nav-active': props.active,
				'nav-color': props.color
			}
		)} data-color={props.color && props.children} href={href}>
			{props.children}
		</a>
	);
}
NavLink.propTypes = {
	children: PropTypes.string.isRequired,
	href: PropTypes.string,
	prefix: PropTypes.string,
	active: PropTypes.bool,
	color: PropTypes.bool,
	hide: PropTypes.bool
};
NavLink.defaultProps = { 
	prefix: '/'
};