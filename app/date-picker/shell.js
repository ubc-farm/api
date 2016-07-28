import Picker from './picker.js';
import React, {Component, PropTypes} from 'react';
import {classlist as cx} from '../../lib/utils/index.js';
import {
	asArray, label, toRfcDate, toDateString
} from '../../lib/calendar/index.js';



export default class DatePickerShell extends Component {
	static get propTypes() {return {
		value: PropTypes.instanceOf(Date).isRequired,
		onChange: PropTypes.func.isRequired,
		
		className: PropTypes.string
	}}

	constructor(props) {
		super(props);
		this.state = {open: false};
		this.togglePicker = this.togglePicker.bind(this);
	}

	togglePicker() {
		this.setState({ open: !this.state.open });
	}

	render() {
		const {value, onChange} = this.props;
		return (
			<span className='date-picker-container'>
				<input className={cx('date-picker-input', this.props.className)} 
					type='text' readOnly
					value={
						label.long.months[value.getMonth()]
						+ ` ${value.getDate()}, ${value.getFullYear()}`
					}
					onClick={this.togglePicker}
				/>
				<Picker {...{value, onChange}} visible={this.state.open}/>
			</span>
		);
	}
}

export class DatePickerDefault extends Component {
	static get propTypes() {return {
		defaultValue: PropTypes.instanceOf(Date).isRequired
	}}

	constructor(props) {
		super(props);
		this.state = {value: props.defaultValue};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({value: e.target.value});
	}

	render() {
		return <DatePickerShell value={this.state.value} onChange={this.onChange}/>;
	}
}