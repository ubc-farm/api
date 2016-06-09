import React, { Component, PropTypes } from 'react';
import calendarArray from 'shared/calendar/array.js';
import _ from '../classnames.js';
import ArrowButton from '../form/arrow-button.jsx';

/**
 * A single month view. Multiple can be combined to pageinate
 * or display in a row.
 */
export default function Month(props) {
	return (

	);
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