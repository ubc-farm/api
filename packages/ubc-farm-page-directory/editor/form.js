import {createElement as h, PropTypes, Component} from 'react'; /** @jsx h */
import {reduxForm} from 'redux-form';

import Name from './name.js';
import Email from './email.js';
import Phone from './phone.js';
import Address from './address.js';

const Form = ({fields, handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<label>
			<span className='label-body'>Name</span>
			<input type='text' {...fields.name} />
		</label>
		<label>
			<span className='label-body'>Email</span>
			<input type='email' {...fields.email} />
		</label>
		<label>
			<span className='label-body'>Phone Number</span>
			<input type='tel' {...fields.phone} />
		</label>
		<div>
			<label htmlFor='physical-address'>Physical Address</label>
			<textarea {...fields.addressPhysical} id='physical-address'
				value={fields.addressPhysical.value || ''} 
			/>
		</div>
	</form>
)

export default reduxForm({
	form: 'contact',
	fields: [
		'name', 'email', 'phone',
		'addressPhysical'
	]
})