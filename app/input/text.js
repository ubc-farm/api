import React, { PropTypes } from 'react';
import {classlist as _} from 'lib/utils';

/**
 * A text field with a single line of text
 * @param {Object} props
 * @param {function} [props.onFocus] - callback for when input is 
 * focused/blurred. If focused, passed true. If blurred, passed false.
 * @param {function} [props.onChange] - callback for value change, 
 * passed the value
 * @param {string} [props.type=text] - type for the input.
 * Only a few types, related to text, are allowed.
 * @param {number} [props.maxlength] - sets a maxiumum length for the input,
 * which will also cause a character counter to be rendered.
 * @param {string} [props.placeholder] text displayed as a placeholder 
 * inside the input. Should be unimportant example text due 
 * to placeholder pitfalls. 
 * @param {string} [props.error] text shown (with CSS) if the input is invalid.
 * Extend this component instead if you want more advanced error-checking.
 * @param {string} [props.helper] text shown after the input when focused. 
 * Should be instruction text.
 * @param {boolean} [props.persistHelper] - always show the helper text if true
 * @param {boolean} [props.float] - sets a class to indicate a floating 
 * label should be used for the input.
 * @param {string} [props.suffix] - displays a suffix for the text input, 
 * such as a unit like kg or °.
 * @param {boolean} [props.disabled] - disabled the input
 */
const TextField = (props) => {
	const {onChange, onFocus, children, focused} = props;
	const {suffix, helper, error, maxlength = -1} = props;
	const {float, persistHelper, disabled} = props;
	const {name = props.id} = props;

	return (
		<div data-focus={focused} className={_(props.className, {
			'text-field': true,
			'text-field-force-helper': persistHelper,
			'text-field-floating': float,
			'text-field-disabled': disabled
		})}>
			<label htmlFor={name} data-text={children} className={_({
				'text-field-label': true,
				'text-field-label-focus': focused,
				'floating-label': float
			})}>
				{children}
			</label>
			<input {...props} name={name} className='text-field-input'
						 onFocus={e => onFocus(true)} onBlur={e => onFocus(false)}
			       onChange={e => onChange(e.target.value)}/>
			<span className='text-field-border'/>

			{suffix ? 
				<span className='text-field-suffix'>{suffix}</span>
			: null}
			
			{helper ? 
				<span className='text-field-helpertext'>{helper}</span>
			: null}
			{error ? 
				<span className='text-field-helpertext text-field-errortext'>
					{error}
				</span>
			: null}

			{maxlength > -1 ? 
				<span className='text-field-counter'>
					{props.value.length} / {maxlength}
				</span>
			: null}
		</div>
	)
}

TextField.propTypes = {
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	id: PropTypes.string.isRequired, 
	focused: PropTypes.bool,

	suffix: PropTypes.string, 
	helper: PropTypes.string, 
	error: PropTypes.string, 
	maxlength: PropTypes.number, 

	float: PropTypes.bool, 
	persistHelper: PropTypes.bool, 
	disabled: PropTypes.bool,

	type: PropTypes.oneOf(['email', 'text', 'url', 'tel', 'number'])
}

TextField.defaultProps = {
	type: 'text',
	onFocus: newFocusState => {},
	onChange: value => {},
	value: ''
}

export default TextField;