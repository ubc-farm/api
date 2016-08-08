import {createElement as h, PropTypes, PureComponent} from 'react'; 
/** @jsx h */
import DialDisplay from './dial-display.js';
import {ClockHand, ClockDialCircle, ClockCenter} from './hand.js';

/**
 * Snaps the given number to the given angle delta
 * @param {number} n
 * @param {number} angle
 * @returns {number} closest value to N that can be divided by angle
 */
const snapTo = (n, angle) => Math.round(n / angle) * angle;

export default class Dial extends PureComponent {
	static get propTypes() {return {
		mode: PropTypes.oneOf(['hours', 'minutes', 'hours-24']),
		value: PropTypes.number.isRequired,
		onChange: PropTypes.func
	}}

	static get defaultProps() {return {
		mode: 'hours',
		onChange() {}
	}}

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	get count() {
		switch (this.props.mode) {
			case 'hours': return 12;
			case 'hours-24': return 24;
			case 'minutes': return 60;
		}
	}

	get snapAngle() {
		return 360 / this.count;
	}

	handleClick(e) {
		const {offsetX, offsetY} = e.nativeEvent;

		const deltaX = offsetX - this._offsetCenterX, deltaY = offsetY - 0;
		const angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

		const newValue = snapTo(angleInDegrees, this.snapAngle);
		this.onChange(newValue);
	}

	componentDidMount() {
		const {offsetWidth} = this._div;
		this._offsetCenterX = offsetWidth / 2;
	}

	render() {
		const angle = this.props.value * this.snapAngle;
		const dialCirclePos = [100 * Math.cos(angle), 100 * Math.sin(angle)];

		return (
			<div onClick={this.handleClick} className='d-picker-dial'>
				<ClockCenter />
				<ClockDialCircle 
					style={{transform: `translate3d(${dialCirclePos.join(',')},0)`}}
				/>
				<ClockHand angle={angle} />
				<DialDisplay count={this.count} />
			</div>
		);
	}
}