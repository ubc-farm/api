import {connect} from 'react-redux';
import MonthCalendar from './month.js';
import {asArray, label, equal} from 'lib/calendar';

const CurrentMonth = connect(
	({today, agenda: {viewingDate, events}}) => ({
		calendar: asArray(viewingDate),
		name: label.long.months[viewingDate.getMonth()],
		events,
		today: equal(viewingDate, today, 2) ? today.getDate() : undefined,
		viewing: equal(viewingDate, today, 2) ? viewingDate.getDate() : undefined,
		year: viewingDate.getFullYear(),
		month: viewingDate.getMonth()
	}),
	dispatch => {
		//onDateClick: date => dispatch(clickedDate(date))
	}
)

export default CurrentMonth;