import React, { PropTypes } from 'react';
import Icon from './icon.jsx';
import _ from '../classnames.js';

/**
 * A button element with a label and icon. Events should be set higher up on
 * creation rather than in this component.
 */
export default function IconButton(props) {
	return (
		<button className={_('i-button icon-text hover-light', props.className)}>
			<Icon className='i-button-icon' name={props.icon}/>
			{props.children}
		</button>);
}

IconButton.propTypes = {
	icon: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	className: PropTypes.string
};