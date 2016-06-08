import React, { Component, PropTypes } from 'react';
import calendarArray from 'shared/calendar/array.js';
import _ from '../classnames.js';

export default function Month(props) {
	//return (

	//);
}

export class DateIcon extends Component {
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
}