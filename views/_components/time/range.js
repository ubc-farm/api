import React, { PropTypes } from 'react';
import {dateString, timeString} from 'calendar/datetime.js';

/**
 * 
 * @param {Object} props
 * @param {Date} start
 * @param {Date} end
 * @param {boolean} [forceDate=false]
 * @param {boolean} [twelve=true]
 */
export default function TimeRange(props) {
	const {start, end} = props;
	if (start == null && end == null) return null;

	let sameHalf = true;
	if (props.twelve) {
		let first = start.getHours(), last = end.getHours();
		if ((first < 12 && last >= 12) || (first >= 12 && last < 12)) {
			sameHalf = false;
		}
	}

	const endTime = (
		<time datetime={end.toUTCString()}>
			{timeString({date: end, amPm: true, twelve: twelve})}
		</time>
	);

	if (!props.forceDate 
	&& start.toDateString() === end.toDateString()) {
		//same date
		return (
			<span className='time'>
				<time datetime={start.toUTCString()}>
					{timeString({date: start, amPm: !sameHalf, twelve: twelve})}
				</time>
				{'–'}
				{endTime}
			</span>
		);
	} else if (props.forceDate 
	&& start.toDateString() === end.toDateString()) {
		//show the date
		return (
			<span className='time'>
				<time datetime={start.toUTCString()}>
					{dateString({date: start, shortMonth: false})}, 
					<br/>
					{timeString({date: start, amPm: !sameHalf, twelve: twelve})}
				</time>
				{'–'}
				{endTime}
			</span>
		);
	} else {
		//diff date
		return (
			<span className='time'>
				<time datetime={start.toUTCString()}>
					{dateString({date: start, shortMonth: true})}, 
					{timeString({date: start, amPm: true, twelve: twelve})}
				</time>
				{'–'}
				<time datetime={end.toUTCString()}>
					{dateString({date: end, shortMonth: true})},
					{timeString({date: end, amPm: true, twelve: twelve})}
				</time>
			</span>
		);
	}
}
TimeRange.propTypes = {
	start: PropTypes.instanceOf(Date),
	end: PropTypes.instanceOf(Date),
	forceDate: PropTypes.bool,
	twelve: PropTypes.bool
};
TimeRange.defaultProps = { forceDate: false, twelve: true };