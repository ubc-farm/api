import {createElement} from 'react'; /** @jsx createElement */
import ReactDOM from 'react-dom';
import {domready} from '../ubc-farm-utils/index.js';

//import DatePicker from './date-picker/container.js';
import Overview from './month-overview/connected.js';
import store from './redux/store.js';
import AgendaList from './agenda/list.js';

domready.then(() => {
	ReactDOM.render(
		(
		<div>
			<Overview store={store} className='agenda-overview-table' />
			<AgendaList date={new Date()}
				loading
			/>
		</div>
		),
		document.getElementById('app-mount')
	);
})