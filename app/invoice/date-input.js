import React, {Component, PropTypes} from 'react';
import {classlist as cx} from '../../lib/utils/index.js';
import {
	asArray, label, toRfcDate, toDateString
} from '../../lib/calendar/index.js';

export default class DatePicker extends Component {
	static get propTypes() {return {
		value: PropTypes.instanceOf(Date).isRequired,
		onChange: PropTypes.func.isRequired,
		className: PropTypes.string
	}}

	constructor(props) {
		super(props);

		this.onInputChange = this.onInputChange.bind(this);
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.onYearHeaderChange = this.onYearHeaderChange.bind(this);

		this.state = {
			open: false
		}
	}

	onInputChange(e) {
		console.log(e.target.value);
		this.props.onChange(new Date(e.target.value), e);
	}
	onInputFocus(e) {this.setState({open: true}); e.preventDefault()}
	onInputBlur(e) {this.setState({open: false}); e.preventDefault()}
	onYearHeaderChange(e) {
		let value = new Date(this.props.value);
		value.setFullYear(e.target.value);
		return this.props.onChange(value, e);
	}

	render() {
		const {value, className} = this.props;
		const {open, selectingDate} = this.state;
		return (
			<span className='date-picker-container'>
				<input className={cx('date-picker-input', className)} 
					type='text' readOnly
					onFocus={this.onInputFocus}
					onBlur={this.onInputBlur}
					value={
						label.long.months[value.getMonth()]
						+ ` ${value.getDate()}, ${value.getFullYear()}`
					}
				/>
				<div className={cx('date-picker', {open})}>
					<time className='date-picker-header' dateTime={toRfcDate(value)}>
						<input className='date-picker-year'
							value={value.getFullYear()} type='text'
							inputMode='numeric'
							/* Update this if you ever plan to use this date picker 
							in the year 3,000. */
							pattern='^[12]\d{3}$'
							onChange={this.onYearHeaderChange}
						/>
						<span 
							className={cx('date-picker-date', {'highlight': selectingDate})}
						>
							{label.short.weeks[value.getDay()]}{', '}
							{label.short.months[value.getMonth()]}{' '}
							{value.getDate()}
						</span>
					</time>
					<div className='date-picker-selector'>
						<h3>{label.long.months[value.getMonth()]}</h3>
					</div>
				</div>
			</span>
		)
	}
}