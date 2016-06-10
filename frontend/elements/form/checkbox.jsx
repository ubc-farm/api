import React, { PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * Base function for Checkbox and Radio. The input is hidden with CSS and 
 * replaced with the i -hack element, which uses :checked to show the 
 * correct checkbox/radio. Most of the logic is done with CSS as a result. 
 */
function CheckBase(props, isRadio) {
	let hack = <i className={isRadio? 'radio-hack' : 'checkbox-hack'}/>
	if (props.customCheck !== undefined) {
		hack = props.customCheck;
	}
	return (
		<label className={_('check-hack-label', props.className)}>
			<input type={isRadio? 'radio' : 'checkbox'} className='check-real' 
			       defaultChecked={props.default} checked={props.checked}
						 onChange={props.onChange}
						 required={props.required} disabled={props.disabled}/>
			{hack}
			{props.children}
		</label>);
}
const propTypes = {
	className: PropTypes.string,
	default: PropTypes.boolean,
	checked: PropTypes.boolean,
	required: PropTypes.boolean,
	disabled: PropTypes.boolean,
	onChange: PropTypes.func,
	customCheck: PropTypes.node
};

export default function Checkbox(props) {return CheckBase(props, false)}
export function Radio(props) {return CheckBase(props, true)}

Checkbox.propTypes = propTypes;
Radio.propTypes = propTypes;