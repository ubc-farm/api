import React, { Component, PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * Component used to display a single date within a month.
 * Usually to be displayed within a Month component.
 */
export default function DateIcon(props) {
	return (
		<td {...props} 
			onClick={props.children !== null && props.onClick}
			className={_(
			'circle', props.className, {
				'hover-light': props.children !== null,
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
	isToday: PropTypes.bool,
	onClick: PropTypes.func
}