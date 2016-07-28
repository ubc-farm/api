import React, {Component, PropTypes} from 'react';
import {classlist as cx} from '../../lib/utils/index.js';
import {
	asArray, label, toRfcDate, toDateString
} from '../../lib/calendar/index.js';

export default class DatePicker extends Component {
	static get propTypes() {return {
		value: PropTypes.instanceOf(Date).isRequired,
		onChange: PropTypes.func.isRequired,
		visible: PropTypes.bool
	}}

	constructor(props) {
		super(props);
		this.setYear = this.setYear.bind(this);
	}

	setYear(e) {
		let date = new Date(this.props.value);
		date.setFullYear(e.target.value);
		this.props.onChange(date);
	}

	render() {
		const {value} = this.props;
		return (
			<div className={cx('date-picker', {'open': this.props.visible})}>
				<time className='date-picker-header' dateTime={toRfcDate(value)}>
					<input className='date-picker-year' value={value.getFullYear()} 
						type='number' step='1' pattern='^\d{4}$'
						onChange={this.setYear}
					/>
					<span className='date-picker-date'>
						{label.short.weeks[value.getDay()]}{', '}
						{label.short.months[value.getMonth()]}{' '}
						{value.getDate()}
					</span>
				</time>

				
			</div>
		);
	}
}