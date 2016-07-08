import React, {PropTypes} from 'react';
import {classlist} from 'lib/utils';

/**
 * Checkbox element. The input is hidden with CSS and replaced by the i element,
 * which uses :checked to show the correct state. Most of the logic is done with
 * CSS as a result.
 * @param {Object} props
 */
const Checkbox = props => (
	<label className={classlist('check-hack-label', props.className)}>
		<input {...props} className='check-real' type='checkbox'/>
		<i className='checkbox-hack'/>
		{props.children}
	</label>
)

Checkbox.propTypes = {
	className: PropTypes.string,
	checked: PropTypes.bool,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
}

export default Checkbox;