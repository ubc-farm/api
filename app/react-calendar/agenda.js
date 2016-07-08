import React, { PropTypes } from 'react';
import {label} from 'lib/calendar'
import {classlist} from 'lib/utils';
import RangeElement from './rangestring.js';
import Checkbox from 'app/checkbox';

function* AgendaItems({date, events, onAction}) {
	for (let event in events.get(date)) {
		const {subject, description, start, end} = event;
		yield (
			<li key={event}>
				<div className='event-buttons'>
					<button onClick={e => onAction(event, 'Edit')}>Edit</button>
					<button onClick={e => onAction(event, 'Fill')}>Fill</button>
					<button onClick={e => onAction(event, 'Add')}>Add</button>
					<button onClick={e => onAction(event, 'Join')}>Join</button>
				</div>
				
				<article className='event-card'>
					<Checkbox onChange={e => onAction(event, 'Check', e.target.checked)}/>
					<h1 className='event-title'>{subject}</h1>
					<p className='event-description'>{description}</p>
					
					<hr/>
					
					<RangeElement {...event}/>
				</article>
			</li>
		)
	}
}

const AgendaDay = ({date, weekday, events, onAction}) => (
	<section>
		<div className={classlist({
			'date-label': true,
			'date-label-past': date < today,
			'date-label-today': date === today
		})}>
			<span className='date-label-day'>{label.short.weeks[weekday]}</span>
			<span className='date-label-date'>{date}></span>
		</div>

		<ol>
			{AgendaItems({date, events, onAction})}
		</ol>
	</section>
)