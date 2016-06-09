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
			       defaultChecked={props.checked} onChange={props.onChange}
						 required={props.required} disabled={props.disabled}/>
			<i className={isRadio? 'radio-hack' : 'checkbox-hack'}/>
			{props.children}
		</label>);
}
const propTypes = {
	className: PropTypes.string,
	checked: PropTypes.boolean,
	required: PropTypes.boolean,
	disabled: PropTypes.boolean
}
const defaultProps = { className: '' };

export default function Checkbox(props) {return CheckBase(props, false)}
export function Radio(props) {return CheckBase(props, true)}

Checkbox.defaultProps = defaultProps;
Checkbox.propTypes = propTypes;
Radio.defaultProps = defaultProps;
Radio.propTypes = propTypes;