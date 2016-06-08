import React, { PropTypes } from 'react';
import Icon from './icon.jsx';

/**
 * A button element with a label and icon. Events should be set higher up on
 * creation rather than in this component.
 */
export default function IconLabelButton(props) {
	return (
		<button className={'i-button icon-text hover-light' + props.className}>
			<Icon className='i-button-icon' name={props.icon}/>
			<span className='i-button-label'>{props.label}</span>
		</button>);
}

/**
 * A button element with only an icon. Events should be set higher up on
 * creation rather than in this component.
 */
export function IconOnlyButton(props) {
	return (
		<button className={'i-button icon-text hover-light' + props.className}
		        title={props.label}>
			<Icon className='i-button-icon' name={props.icon}/>
		</button>);
}

const propTypes = {
	icon: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	className: PropTypes.string
};
const defaultProps = { className: '' };
IconLabelButton.defaultProps = defaultProps;
IconLabelButton.propTypes = propTypes;
IconOnlyButton.defaultProps = defaultProps;
IconOnlyButton.propTypes = propTypes;