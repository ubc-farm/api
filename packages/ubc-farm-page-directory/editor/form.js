import {createElement as h} from 'react'; /** @jsx h */
import {reduxForm, Field, propTypes} from 'redux-form';

const Form = ({handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<label>
			<span className='label-body'>Name</span>
			<Field component='input' type='text' name='name' />
		</label>
		<label>
			<span className='label-body'>Email</span>
			<Field component='input' type='email' name='email' />
		</label>
		<label>
			<span className='label-body'>Phone Number</span>
			<Field component='input' type='tel' name='phone' />
		</label>
		<div>
			<label htmlFor='physical-address'>Physical Address</label>
			<Field component='textarea' name='addressPhysical' id='addressPhysical' />
		</div>
	</form>
)

Form.propTypes = propTypes;

export default reduxForm({
	form: 'contact'
})