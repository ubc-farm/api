import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import AgendaItem from './item.js';
import AgendaDayHeader from './day-header.js';

const AgendaDayList = ({date, events, onHeaderClick, onItemClick}) => (
	<section className='agenda-date-list'>
		<AgendaDayHeader date={date} onClick={onHeaderClick} />
		<ol className='agenda-date-list-contents'>
			{events.map(event => (
				<AgendaItem {...event} key={event.id}
					onAction={t => onItemClick(event, t)} 
				/>
			))}
		</ol>
	</section>
)

AgendaDayList.propTypes = {
	date: PropTypes.instanceOf(Date),
	events: PropTypes.arrayOf(PropTypes.object),
	onHeaderClick: PropTypes.func,
	onItemClick: PropTypes.func
}