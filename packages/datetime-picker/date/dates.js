import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {classlist as cx} from '../../ubc-farm-utils/index.js';

/**
 * A single date in the month overview
 */
export const PickerDate = ({onClick, children, selected, today}) => (
	<td
		onClick={onClick}
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
	dates, onClick, onPrevious, onFollowing,
	selectedDate, todayDate
}) => (
	<tbody>
		{dates.map((row, index) => (
			<tr key={index}>
				{row.map((date, i) => {
					let _onClick, key = date;
					if (date === null) {
						key = `blank-${i}`;
						if (index === 0) _onClick = onPrevious;
						else if (index >= 4) _onClick = onFollowing;
					} else {
						_onClick = () => onClick(date)
					}

					return (
						<PickerDate key={key}
							onClick={_onClick}
							selected={selectedDate === date}
							today={todayDate === date}
						>
							{date}
						</PickerDate>
					);
				})}
			</tr>
		))}
	</tbody>
)

PickerBody.propTypes = {
	dates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	onClick: PropTypes.func,
	eventCheck: PropTypes.func,
	selectedDate: PropTypes.number,
	todayDate: PropTypes.number,
	onPrevious: PropTypes.func,
	onFollowing: PropTypes.func
}

export default PickerBody;