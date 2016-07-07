import React, { PropTypes } from 'react';
import {classlist} from 'lib/utils';
import {label} from 'lib/calendar';

const MonthCalendar = ({
	calendar, year, month, onDateClick, viewing, today, events
}) => (
	<table className='small-calendar'>
		<caption className='month-heading'>
			{label(month) + ' ' + year}
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
						'cal-event': events.has(new Date(year, month, date)),
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

MonthCalendar.propTypes = {
	calendar: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	onDateClick: PropTypes.func,
	viewing: PropTypes.number,
	today: PropTypes.number,
	events: PropTypes.instanceOf(Map)
}

export default MonthCalendar;