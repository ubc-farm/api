import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {classlist as cx} from '../../ubc-farm-utils/index.js';

/**
 * A single date in the month overview
 */
export const PickerDate = ({onClick, children, selected, today}) => (
	<td
		onClick={children ? () => onClick(children) : undefined}
		className={cx('circle', {
			'hover-light': children,
			'd-picker-day': children,
			'd-picker-selected': selected,
			'd-picker-today': today
		})}
	>{children}</td>
);

PickerDate.propTypes = {
	children: PropTypes.number,
	onClick: PropTypes.func,
	selected: PropTypes.bool,
	today: PropTypes.bool
}

/**
 * The body section of the month overview, displaying a grid of dates
 * corresponding to the month.
 */
const PickerBody = ({
	dates, onClick, 
	selectedDate, todayDate
}) => (
	<tbody>
		{dates.map((row, index) => (
			<tr key={index}>
				{row.map((date, i) => (
					<PickerDate key={date === null? `blank-${i}` : date}
						onClick={onClick}
						selected={selectedDate === date}
						today={todayDate === date}
					>{date}</PickerDate>
				))}
			</tr>
		))}
	</tbody>
)

PickerBody.propTypes = {
	dates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	onClick: PropTypes.func,
	eventCheck: PropTypes.func,
	selectedDate: PropTypes.number,
	todayDate: PropTypes.number
}

export default PickerBody;