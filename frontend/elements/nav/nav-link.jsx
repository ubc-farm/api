import React, { PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {string} [props.href] - link to use. If ommited, one is generated from the name
 * @param {boolean} [props.active] - if true, add the class active to this link
 * @param {string} [props.prefix=/] prefix for link generation
 * @param {boolean} [props.color] sets up link for colorized hover
 * @param {boolean} [props.hide] hides if true 
 */
export default function NavLink(props) {
	if (hide) return null;
	let href = props.href || prefix + props.name.toLowerCase();
	return (
		<a className={_(
			'nav-link', 'hover-light',
			{
				'nav-active': props.active,
				'nav-color': props.color
			}
		)} data-color={props.color && props.name} href={href}>
			{props.name}
		</a>
	);
}
NavLink.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string,
	prefix: PropTypes.string,
	active: PropTypes.boolean,
	color: PropTypes.boolean,
	hide: PropTypes.boolean
};
NavLink.defaultProps = { 
	prefix: '/'
};