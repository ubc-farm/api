import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {longMonthNames} from '../../ubc-farm-utils/calendar/index.js';

/**
 * Label for the overview, meant to display the month name and 
 * show arrows for moving to the previous and following months.
 */
const OverviewLabel = ({date, onLeftClick, onRightClick, showYear}) => (
	<caption>
		<button type='button'
			onClick={onLeftClick}
			className='material-icons cal-month-button'
			style={{float: 'left'}}
		>
			keyboard_arrow_left
		</button>

		<button type='button'
			onClick={onRightClick}
			className='material-icons cal-month-button'
			style={{float: 'right'}}
		>
			keyboard_arrow_right
		</button>

		<h3>
			{longMonthNames[date.getMonth()]}
			{showYear? ' ' + date.getFullYear() : ''}
		</h3>
	</caption>
);

OverviewLabel.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	onLeftClick: PropTypes.func,
	onRightClick: PropTypes.func,
	showYear: PropTypes.bool
}

export default OverviewLabel;