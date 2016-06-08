import React, { PropTypes } from 'react';

/**
 * Base function for Checkbox and Radio. The input is hidden with CSS and 
 * replaced with the i -hack element, which uses :checked to show the 
 * correct checkbox/radio. Most of the logic is done with CSS as a result. 
 */
function CheckBase(props, isRadio) {
	return (
		<label className={'check-hack-label' + (props.className)}>
			<input type={isRadio? 'radio' : 'checkbox'} className='check-real' 
			       checked={props.checked} required={props.required}/>
			<i className={isRadio? 'radio-hack' : 'checkbox-hack'}/>
			{props.label}
		</label>);
}
const propTypes = {
	className: PropTypes.string,
	checked: PropTypes.boolean,
	required: PropTypes.boolean,
	label: PropTypes.string.isRequired
}
const defaultProps = { className: '' };

export default function Checkbox(props) {return CheckBase(props, false)}
export default function Radio(props) {return CheckBase(props, true)}

Checkbox.defaultProps = defaultProps;
Checkbox.propTypes = propTypes;
Radio.defaultProps = defaultProps;
Radio.propTypes = propTypes;