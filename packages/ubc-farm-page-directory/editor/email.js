import {createElement as h, PropTypes} from 'react'; 
/** @jsx h */

const EmailField = ({defaultValue}) => (
	<label>
		<span className='label-body'>Email</span>
		<input type='email' name='email'
			defaultValue={defaultValue}
			autoComplete='email'
		/>
	</label>
)

EmailField.propTypes = {
	defaultValue: PropTypes.string
}

export default EmailField;