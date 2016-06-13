import React, { PropTypes } from 'react';
import _ from '../classnames.js';
import Checkbox from '../form/checkbox.js';
import TimeRange from './range.js';

/**
 * An event card to display in a agenda
 */
export default function EventCard(props) {
	let title = <h4>{props.title}</h4>;
	if (props.isTask) {
		title = (
			<Checkbox checked={props.done} onChange={props.onCheck}>
				{title}
			</Checkbox>
		);
	}

	return (
		<div className={_('event-card', {'task-card': props.isTask})}>
			<div className='hover-controls'>
				{props.controls}
			</div>
			{props.programs.map(programIndicator)}
			{title}
			<TimeRange start={props.start} end={props.end}/>
			{props.location}
			<hr/>
			{props.children}
		</div>
	);
}
EventCard.propTypes = {
	title: PropTypes.string.isRequired,
	programs: PropTypes.arrayOf(PropTypes.string),
	startTime: PropTypes.instanceOf(Date),
	endTime: PropTypes.instanceOf(Date),
	done: PropTypes.boolean,
	location: PropTypes.node,
	onCheck: PropTypes.func,
	onOpen: PropTypes.func
}
EventCard.defaultProps = {programs: []}

function programIndicator(program) {
	return <div className={_('program-indicator', program)}/>
}