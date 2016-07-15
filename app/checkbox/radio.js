import React from 'react';
import {classlist} from '../../lib/utils/index.js';
import Checkbox from './checkbox.js'

/**
 * Radio button based on the Checkbox code. Takes the same props as Checkbox.
 * @param {Object} props
 * module:app/checkbox.Radio
 */
const Radio = props => (
	<label className={classlist(
		'check-hack-label', 'radio-hack-label', props.className
	)}>
		<input {...props} className='check-real radio-real'/>
		<i className='checkbox-hack radio-hack' type='radio'/>
		{props.children}
	</label>
)

Radio.propTypes = Checkbox.propTypes;

export default Radio;