import React, { PropTypes } from 'react';
import {label} from 'lib/calendar'
import {classlist} from 'lib/utils';
import RangeElement from './rangestring.js';

function* AgendaItems({date, events}) {
	for (let event in events.get(date)) {
		const {subject, description, start, end} = event;
		yield (
			<li>
				<div className='event-buttons'>

				</div>
				
				<article>
					<h1>{subject}</h1>
					<p>{description}</p>
					
					<hr/>
					
					<RangeElement {...event}/>
				</article>
			</li>
		)
	}
}

const AgendaDay = ({date, weekday, events}) => (
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
			{AgendaItems({date, events})}
		</ol>
	</section>
)