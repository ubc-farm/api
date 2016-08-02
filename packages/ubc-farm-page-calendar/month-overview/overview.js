import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {asArray, longMonthNames, equal} from '../../ubc-farm-utils/calendar/index.js';

import Caption from './label.js';
import Head from './week-headings.js';
import Body from './dates.js';

const Overview = ({
	viewingDate = new Date(), todayDate = new Date(),
	onPrevious, onFollowing, onDateClick, eventCheck
}) => {
	const currentMonth = viewingDate.getMonth();
	const sameMonthAsToday = equal(todayDate, viewingDate, 2);

	return (
		<table>
			<Caption onLeftClick={onPrevious}	onRightClick={onFollowing}>
				{longMonthNames[currentMonth]}
			</Caption>
			<Head />
			<Body
				dates={asArray(viewingDate)}
				viewingDate={viewingDate} 
				todayDate={sameMonthAsToday ? todayDate : undefined}
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