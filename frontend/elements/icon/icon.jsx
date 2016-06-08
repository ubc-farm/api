import React, { PropTypes } from 'react';

/**
 * Represents an icon from the assets/images/icons folder. If the icon isn't 
 * given a name, null is returned (therefore nothing is rendered).
 * @param {Object} props
 * @param {string} props.name - set to null to return null
 * @param {string} [props.className] - passes extra classes to the icon
 * @param {number} [props.size=24] - size for the icon
 */
export default function Icon(props) {
	if (props.name == null) return null;
	return (
		<img className={'icon-image' + (props.className)} alt='' 
			   width={props.size} height={props.size} 
				 src={'/assets/images/icons/' + (props.name) + '.svg'}/> );
}
Icon.propTypes = {
	size: PropTypes.number,
	className: PropTypes.string,
	name: PropTypes.string
};
Icon.defaultProps = { size: 24, className: '' };