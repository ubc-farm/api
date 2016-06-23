import {createElement as r, PropTypes} from 'react';
import toRangeString from '../rangestring.js';

/**
 * Returns a react element using the RangeString function to build
 * the string.
 */
export default function(props) {
	const range = RangeString(props.start, props.end, props);

	const transform = (arr) => arr.reduce((building, value, i) => {
		if (i !== 0) building.push(r('br'))
		building.push(value);
		return building;
	}, [])

	return r('span', {className: 'time'},
		r('time', {datetime: range[0].utc}, ...transform(range[0].text)),
		'–',
		r('time', {datetime: range[1].utc}, ...transform(range[1].text))
	);
}