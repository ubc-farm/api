import React, { PropTypes } from 'react';
import {classlist} from 'lib/utils';

const MonthCalendar = props => {
	const {calendar, name} = props;
	return (
		<table className='small-calendar'>
			<caption className='month-heading'>
				{name}
			</caption>
			<thead>
				<tr className='week-title'>
					{
						['S', 'M', 'T', 'W', 'T', 'F', 'S']
							.map(w => <th scope='col'>{w}</th>)
					}
				</tr>
			</thead>
			<tbody>
				{calendar.map(row => row.map(date => (
					<td onClick={e => onDateClick(date)}
						className={classlist({
							'circle': true, 
							'hover-light': date,
							'cal-day': date,
							'cal-event': events.has(date),
							'cal-viewing': viewing === date,
							'cal-today': today === date
						})}
					>
						{date}
					</td>
				)))}
			</tbody>
		</table>
	)
}

MonthCalendar.propTypes = {
	calendar: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	name: PropTypes.string.isRequired,
	onDateClick: PropTypes.func,
	viewing: PropTypes.number,
	today: PropTypes.number,
	events: PropTypes.instanceOf(Map)
}

export default MonthCalendar;