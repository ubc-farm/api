import {createElement as h, PureComponent, PropTypes} from 'react'; 
/** @jsx h */
import {
	shortMonthNames as sMonth, shortWeekdayNames as sWeek
} from '../../ubc-farm-utils/calendar/index.js';

export default class PickerHeader extends PureComponent {
	static get propTypes() {return {
		date: PropTypes.instanceOf(Date).isRequired,
		onYearBlur: PropTypes.func
	}}

	constructor(props) {
		super(props);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.state = {year: props.date.getFullYear()};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({year: nextProps.date.getFullYear()})
	}

	handleYearChange(e) {
		const year = e.target.value;

		if (Math.abs(year - this.state.year) < 2) {
			this.props.onYearBlur(year);
		}

		this.setState({year: e.target.value});
	}

	render() {
		const {onYearBlur, date} = this.props;
		const month = date.getMonth(), day = date.getDate(), weekday = date.getDay()

		return (
			<header className='d-picker-heading'>
				<input type='number'
					min={1000} step={1}
					value={this.state.year}
					onChange={this.handleYearChange}
					onBlur={e => onYearBlur(e.target.value)}
					placeholder={new Date().getFullYear()}
					className='d-picker-year-input'
				/>
				<h3 className='d-picker-title'>
					{`${sWeek[weekday]}, ${sMonth[month]} ${day}`}
				</h3>
			</header>
		);
	}
}