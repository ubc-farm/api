import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {classlist as cx} from '../../ubc-farm-utils/index.js';

/**
 * A single date in the month overview
 */
export const OverviewDate = ({onClick, children, hasEvent, viewing, today}) => (
	<td
		onClick={children ? () => onClick(children) : undefined}
		className={cx('circle', {
			'hover-light': children,
			'cal-day': children,
			'cal-event': hasEvent,
			'cal-viewing': viewing,
			'cal-today': today
		})}
	>{children}</td>
);

OverviewDate.propTypes = {
	children: PropTypes.number,
	onClick: PropTypes.func,
	hasEvent: PropTypes.bool,
	viewing: PropTypes.bool,
	today: PropTypes.bool
}

/**
 * The body section of the month overview, displaying a grid of dates
 * corresponding to the month.
 */
const OverviewBody = ({
	dates, onClick, 
	eventCheck = ()=>false, 
	viewingDate, todayDate
}) => (
	<tbody>
		{dates.map((row, index) => (
			<tr key={index}>
				{row.map((date, i) => (
					<OverviewDate key={date === null? `blank-${i}` : date}
						onClick={onClick}
						hasEvent={eventCheck(date)}
						viewing={viewingDate === date}
						today={todayDate === date}
					>{date}</OverviewDate>
				))}
			</tr>
		))}
	</tbody>
)

OverviewBody.propTypes = {
	dates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	onClick: PropTypes.func,
	eventCheck: PropTypes.func,
	viewingDate: PropTypes.number,
	todayDate: PropTypes.number
}

export default OverviewBody;