import React, { Component, PropTypes } from 'react';
import calendarArray from 'shared/calendar/array.js';
import {months} from 'shared/calendar/monthnames.js';
import _ from '../classnames.js';
import ArrowButton from '../form/arrow-button.jsx';

/**
 * A single month view. Multiple can be combined to pageinate
 * or display in a row.
 */
export default function Month(props) {
	let today = new Date(), todayDate;
	if ((today.getFullYear() === props.month.getFullYear()) 
	&& (today.getMonth() === props.month.getMonth())) {
		todayDate = today.getDate();
	}

	return (
		<table className='small-calendar'>
			<caption className='month-heading'>
				<ArrowButton dir='left'/>
				{months[props.month.getMonth()]}
				<ArrowButton dir='right'/>
			</caption>
			<tr className='week-title'>
				<th scope="col">S</th>
				<th scope="col">M</th>
				<th scope="col">T</th>
				<th scope="col">W</th>
				<th scope="col">T</th>
				<th scope="col">F</th>
				<th scope="col">S</th>
			</tr>
			{calendarArray(props.month).map(week => {
				return (<tr className='cal-week'>{week.map(day => {
					return <DateIcon date={day} today={todayDate === day}/>;
				})}</tr>);
			})}
		</table>
	);
}
Month.propTypes = {
	month: PropTypes.instanceOf(Date).isRequired
}

/**
 * Represents a number representing the date inside the month table
 */
export class DateIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {viewing: false}
	}

	render() {
		return (
			<td className={_(
				'circle hover-light',
				{
					'cal-day': this.props.date !== 0,
					'cal-event': this.props.hasEvent,
					'cal-viewing' : this.state.viewing,
					'cal-today': this.props.today
				}
			)}>
			{this.props.date !== 0 ? this.props.date : ''}
			</td>
		);
	}

	static get propTypes() {
		return {
			date: PropTypes.number,
			hasEvent: PropTypes.boolean,
			today: PropTypes.boolean
		}
	}
	static get defaultProps() {
		return {date: 0}
	}
}