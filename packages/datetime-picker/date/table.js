import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {asArray, equal} from '../../ubc-farm-utils/calendar/index.js';

import Caption from './label.js';
import Head from './headings.js';
import Body from './dates.js';

const PickerTable = ({
	viewingDate = new Date(), todayDate = new Date(), selectedDate = new Date(),
	onPrevious, onFollowing, onDateClick,
	className
}) => {
	const sameMonthAsToday = equal(todayDate, viewingDate, 2);
	const sameMonthAsSelected = equal(selectedDate, viewingDate, 2);

	return (
		<table className={className}>
			<Caption 
				onLeftClick={onPrevious} 
				onRightClick={onFollowing} 
				date={viewingDate} 
				showYear
			/>
			<Head />
			<Body
				dates={asArray(viewingDate)}
				selectedDate={sameMonthAsSelected ? selectedDate.getDate() : undefined} 
				todayDate={sameMonthAsToday ? todayDate.getDate() : undefined}
				onClick={onDateClick}
				onPrevious={onPrevious} onFollowing={onFollowing}
			/>
		</table>
	)
}

PickerTable.propTypes = {
	viewingDate: PropTypes.instanceOf(Date),
	todayDate: PropTypes.instanceOf(Date),
	selectedDate: PropTypes.instanceOf(Date),
	onPrevious: PropTypes.func,
	onFollowing: PropTypes.func,
	onDateClick: PropTypes.func,
	className: PropTypes.string
}

export default PickerTable;