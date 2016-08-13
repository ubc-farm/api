import {createElement as h, PureComponent, PropTypes} from 'react'; 
/** @jsx h */
import {classlist as cx} from '../../ubc-farm-utils/index.js';
import Header from './picker-header.js';
import Table from './table.js';

export default class DatePicker extends PureComponent {
	static get propTypes() {return {
		value: PropTypes.instanceOf(Date),
		onChange: PropTypes.func,
		today: PropTypes.instanceOf(Date),

		className: PropTypes.string,
		style: PropTypes.object,
		hidden: PropTypes.bool
	}}

	static get defaultProps() {return {
		value: new Date(Date.now()),
		today: new Date(Date.now())
	}}

	constructor(props) {
		super(props);

		this.handlePreviousArrow = this.handleMonthArrow.bind(this, -1);
		this.handleFollowingArrow = this.handleMonthArrow.bind(this, 1);
		this.handleDateClick = this.handleDateClick.bind(this);
		this.handleYearBlur = this.handleYearBlur.bind(this);

		this.state = {viewing: props.value};
	}

	componentWillReceiveProps(nextProps) {
		const newYear = nextProps.value.getFullYear(); 
		if (newYear !== this.props.value.getFullYear()) {
			let newDate = new Date(this.state.viewing);
			newDate.setFullYear(newYear);
			this.setState({viewing: newDate});
		}
	}

	handleMonthArrow(changeAmount) {
		let newDate = new Date(this.state.viewing);
		const currentMonth = newDate.getMonth();
		newDate.setMonth(currentMonth + changeAmount);
		this.setState({viewing: newDate});
	}

	handleDateClick(date) {
		let newDate = new Date(this.state.viewing);
		newDate.setDate(date);
		this.props.onChange(newDate);
	}

	handleYearBlur(year) {
		let newDate = new Date(this.props.value);
		newDate.setFullYear(year);
		this.props.onChange(newDate);
	}

	render() {
		const {value, today, className, style, hidden} = this.props;

		return (
			<div 
				className={cx('d-picker', className)}
				style={style} hidden={hidden}
			>
				<Header date={value} onYearBlur={this.handleYearBlur} />

				<Table
					viewingDate={this.state.viewing}
					todayDate={today}
					selectedDate={value}
					onPrevious={this.handlePreviousArrow}
					onFollowing={this.handleFollowingArrow}
					onDateClick={this.handleDateClick}
				/>
			</div>
		)
	}
}