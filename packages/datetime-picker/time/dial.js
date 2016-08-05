import {createElement as h, PropTypes, cloneElement} from 'react'; /** @jsx h */
import ClockNumber from './number.js';

function* DialNumbers(count) {
	const angleDelta = 360 / count;
	for (let i = 0; i < count; i++) 
		yield (<ClockNumber angle={angleDelta * i}>{i + 1}</ClockNumber>);
}

const isEven(n) => n % 2 === 0;

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

function* Minute() {
	const angleDelta = 360 / 60;
	for (let i = 0; i < 60; i++) 
		yield (<ClockNumber angle={angleDelta * i}>{i + 1}</ClockNumber>);
}