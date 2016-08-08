import {createElement as h, PropTypes, cloneElement} from 'react'; /** @jsx h */
import ClockNumber from './number.js';

function* DialNumbers(count = 12) {
	const angleDelta = 360 / count;
	for (let i = 0; i < count; i++) 
		yield (<ClockNumber angle={angleDelta * i}>{i + 1}</ClockNumber>);
}

const isEven = (n) => n % 2 === 0;

function* TwentyFourHour() {
	let i = 0;
	for (const num of DialNumbers(24)) {
		if (isEven(i)) {
			const className = 'even-hour';
			const props = i === 24
				? {className, children: 0}
				: {className};
			yield cloneElement(num, props);
		} else {
			yield num;
		}

		i++;
	}
}

const Dial = ({count, className}) => (
	<div className={className}>
		{count === 24 ? TwentyFourHour() : DialNumbers(count)}
	</div>
);

Dial.propTypes = {
	count: PropTypes.number,
	className: PropTypes.string
}

export default Dial;