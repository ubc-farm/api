import {createElement as h, PropTypes, cloneElement} from 'react'; /** @jsx h */
import ClockNumber from './number.js';

function* DialNumbers(count = 12) {
	const angleDelta = 360 / count;
	for (let i = 0; i < count; i++) 
		yield (<ClockNumber angle={angleDelta * i}>{i + 1}</ClockNumber>);
}

export const TwelveHour = DialNumbers.bind(undefined, 12);

const isEven = n => n % 2 === 0;

export function* TwentyFourHour() {
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

export function* Minutes() {
	let i = 0;
	for (const num of DialNumbers(12)) {
		const value = i * 5;
		const twoDigitString = value < 10 ? `0${value}` : `${value}`;

		yield cloneElement(num, {}, twoDigitString);
		i++;
	}
}

const DialDisplay = ({count}) => {
	let generator;
	switch (count) {
		case 12: generator = TwelveHour; break;
		case 24: generator = TwentyFourHour; break;
		case 60: generator = Minutes; break;
	}

	return <div className='t-picker-dial-display'>{generator()}</div>
}

DialDisplay.propTypes = {
	count: PropTypes.number
}

export default DialDisplay;