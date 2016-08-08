import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import AgendaItem from './item.js';
import AgendaDayHeader from './day-header.js';
import Loader from './loader.js';

const AgendaDayList = ({date, events, loading, onHeaderClick, onItemClick}) => (
	<section className='agenda-date-list'>
		<AgendaDayHeader date={date} onClick={onHeaderClick} />
		{loading 
			? <Loader />
			: (
			<ol className='agenda-date-list-contents'>
				{events.map(event => (
					<AgendaItem {...event} key={event.id}
						onAction={t => onItemClick(event, t)} 
					/>
				))}
			</ol>
			)
		}
	</section>
)

AgendaDayList.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	events: PropTypes.arrayOf(PropTypes.object),
	loading: PropTypes.bool,
	onHeaderClick: PropTypes.func,
	onItemClick: PropTypes.func
}

export default AgendaDayList;