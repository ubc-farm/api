import React, { PropTypes } from 'react';
import _ from '../classnames.js';

const shortWeeks = [
	'Sun', 'Mon', 'Tue',
	'Wed', 'Thu', 'Fri', 'Sat'
];

/**
 * A label for the date, meant for the agenda view.
 */
export default function DateLabel({date, form}) {
	return (
		<div className={_(
			'date-label',
			{
				'date-label-past': form === 'past',
				'date-label-today': form === 'today'
			}
		)}>
			<span className='date-label-day'>{shortWeeks[date.getDay()]}</span>
			<span className='date-label-date'>{date.getDate()}></span>
		</div>
	);
}
DateLabel.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	form: PropTypes.oneOf(['past', 'today', 'future'])
}
DateLabel.defaultProps = {
	form: 'future'
}