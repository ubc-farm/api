import React, { PropTypes } from 'react';
import _ from '../classnames.js';
import Checkbox from '../form/checkbox.jsx';

/**
 * An event card to display in a agenda
 */
export default function EventCard({date, form}) {
	return (
		<div className={_('event-card', this.props.program)}>

		</div>
	);
}
EventCard.propTypes = {
	program: PropTypes.string,
	onChange: PropTypes.func
}