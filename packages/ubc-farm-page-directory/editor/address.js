import {createElement as h} from 'react'; /** @jsx h */

const AddressField = props => (
	<textarea 
		rows={3} 
		spellCheck
		wrap='soft'
		{...props}
	/>
)

export default AddressField;