import { createElement as r, PropTypes } from 'react';
import _ from 'lib/utils/classlist';

/**
 * @param {Object} props
 * @param {string} props.children
 * @param {string} [props.href] - link to use. If ommited, one is generated from the name
 * @param {boolean} [props.active] - if true, add the class active to this link
 * @param {string} [props.prefix=/] prefix for link generation
 * @param {boolean} [props.color] sets up link for colorized hover
 * @param {boolean} [props.hide] hides if true 
 */
export default function NavLink({hide, href, prefix, children, active, color}) {
	if (hide) return null;
	const className = _('nav-link', 'hover-light', {
		'nav-active': active, 'nav-color': color
	});
	href = href || prefix + children.toLowerCase();

	return r('a', {className, href, 'data-name': color && children}, children)
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