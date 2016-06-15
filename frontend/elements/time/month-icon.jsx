import React, { Component, PropTypes } from 'react';
import _ from '../classnames.js';

export default function DateIcon(props) {
	return (
		<td {...props} className={_(
			'circle', 'hover-light', props.className, {
				'cal-day': props.date !== 0,
				'cal-event': props.hasEvent,
				'cal-viewing': props.viewing,
				'cal-today': props.isToday
		})}/>
	)
}

DateIcon.propTypes = {
	date: PropTypes.number,
	hasEvent: PropTypes.bool,
	isToday: PropTypes.bool
}