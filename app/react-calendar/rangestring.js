import React, {PropTypes} from 'react';
import toRangeString from 'lib/calendar/rangestring.js';

/**
 * Returns a react element using the RangeString function to build
 * the string.
 */
const RangeStringElement = ({start, end, forceDate, twelveHour}) => {
	[start, end] = toRangeString(start, end, {forceDate, twelveHour});

	const insertLineBreaks = children => children.reduce((text, val, i) => {
		if (i !== 0) text.push(<br/>);
		text.push(val);
		return text;
	}, []);

	return (
		<span className='time'>
			<time datetime={start.utc}>{insertLineBreaks(start.text)}</time>
			<time datetime={end.utc}>{insertLineBreaks(end.text)}</time>
		</span>
	)
}

RangeStringElement.propTypes = {
	start: PropTypes.instanceOf(Date).isRequired,
	end: PropTypes.instanceOf(Date).isRequired,
	forceDate: PropTypes.boolean,
	twelveHour: PropTypes.boolean
}