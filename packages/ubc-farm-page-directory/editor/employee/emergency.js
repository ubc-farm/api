import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import PhoneField from '../phone.js';

const Emergency = () => (
	<fieldset name='emergency_info'>
		<legend>Emergency Contact</legend>
		<label>
			<span className='label-body'>Name</span>
			<input type='text' name='emergencyContactName'
				defaultValue=''
			/>
		</label>
		<PhoneField name='emergencyContactNumber' />
	</fieldset>
)

export default Emergency;