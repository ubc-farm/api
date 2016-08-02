import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {asArray, compare} from '../../ubc-farm-utils/calendar/index.js';

import Caption from './label.js';
import Head from './week-headings.js';
import Body from './dates.js';

const Overview = ({
	viewingDate = new Date(), todayDate = new Date(),
	onPrevious, onFollowing, onDateClick, eventCheck
}) => {
	const comparison = compare(todayDate, viewingDate, 2);
	const sameYearAsToday = comparison.fullyear;
	const sameMonthAsToday = comparison.fullyear && comparison.month;

	return (
		<table>
			<Caption 
				onLeftClick={onPrevious} 
				onRightClick={onFollowing} 
				date={viewingDate} 
				showYear={sameYearAsToday}
			/>
			<Head />
			<Body
				dates={asArray(viewingDate)}
				viewingDate={viewingDate.getDate()} 
				todayDate={sameMonthAsToday ? todayDate.getDate() : undefined}
				onClick={onDateClick}
				eventCheck={eventCheck}
			/>
		</table>
	)
}

Overview.propTypes = {
	viewingDate: PropTypes.instanceOf(Date),
	todayDate: PropTypes.instanceOf(Date),
	onPrevious: PropTypes.func,
	onFollowing: PropTypes.func,
	onDateClick: PropTypes.func,
	eventCheck: PropTypes.func
}

export default Overview;