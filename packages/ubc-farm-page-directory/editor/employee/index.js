import {createElement as h} from 'react'; /** @jsx h */

import EmergencyField from './emergency.js';
import WorkingDays from './working-days.js';

export default (
	<fieldset name='employee_info'>
		<EmergencyField />
		<WorkingDays />
	</fieldset>
)